const http = require("node:http");

const HOST = "127.0.0.1";
const PORT = Number(process.env.PORT || 4179);
const MAX_BODY_BYTES = 4 * 1024;

// Estes tokens e pessoas são fixtures públicas para estudo. Eles não autenticam
// uma pessoa real e nunca devem ser usados como modelo de login de produção.
const DEMO_TOKENS = new Map([
  ["demo-token-ana", "person-ana"],
  ["demo-token-bruno", "person-bruno"]
]);

function createInitialState() {
  return {
    profiles: new Map([
      ["person-ana", {
        name: "Ana Fictícia",
        email: "ana@exemplo.test",
        studyItems: [
          { id: "study-html", topic: "HTML semântico", status: "em andamento" },
          { id: "study-js", topic: "Funções JavaScript", status: "planejado" }
        ]
      }],
      ["person-bruno", {
        name: "Bruno Fictício",
        email: "bruno@exemplo.test",
        studyItems: [
          { id: "study-sql", topic: "Consultas SQL", status: "concluído" }
        ]
      }]
    ])
  };
}

function sendJson(response, statusCode, value) {
  const body = JSON.stringify(value);
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body),
    "cache-control": "no-store",
    "x-content-type-options": "nosniff"
  });
  response.end(body);
}

function sendError(response, statusCode, code, message) {
  sendJson(response, statusCode, { error: { code, message } });
}

function findProfile(request, state) {
  const authorization = request.headers.authorization || "";
  const match = /^Bearer ([A-Za-z0-9-]+)$/.exec(authorization);
  if (!match) return { error: "UNAUTHENTICATED" };

  const profileId = DEMO_TOKENS.get(match[1]);
  if (!profileId) return { error: "UNAUTHENTICATED" };

  // O identificador vem do token reconhecido no servidor. A API não aceita um
  // profileId enviado no corpo ou na URL para escolher de quem ler/escrever.
  const profile = state.profiles.get(profileId);
  if (!profile) return { error: "PROFILE_NOT_FOUND" };
  return { profileId, profile };
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    const contentType = request.headers["content-type"] || "";
    const mediaType = contentType.split(";", 1)[0].trim().toLowerCase();
    if (mediaType !== "application/json") {
      request.resume();
      reject(Object.assign(new Error("Envie um corpo JSON."), { statusCode: 415, code: "JSON_REQUIRED" }));
      return;
    }

    const chunks = [];
    let size = 0;
    let settled = false;

    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES && !settled) {
        settled = true;
        request.resume();
        reject(Object.assign(new Error("O corpo excede 4 KiB."), { statusCode: 413, code: "BODY_TOO_LARGE" }));
        return;
      }
      if (!settled) chunks.push(chunk);
    });

    request.on("end", () => {
      if (settled) return;
      try {
        const value = JSON.parse(Buffer.concat(chunks).toString("utf8"));
        if (!value || Array.isArray(value) || typeof value !== "object") {
          throw new SyntaxError("O corpo precisa ser um objeto JSON.");
        }
        resolve(value);
      } catch {
        reject(Object.assign(new Error("O corpo não contém um objeto JSON válido."), { statusCode: 400, code: "INVALID_JSON" }));
      }
    });

    request.on("error", (error) => {
      if (!settled) reject(error);
    });
  });
}

function isDemoEmail(value) {
  // Validação didática mínima. Um sistema real precisa verificar a posse do
  // endereço e adotar uma biblioteca/regra adequada ao produto.
  return typeof value === "string"
    && value.length <= 254
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function createLabServer({ state = createInitialState() } = {}) {
  const server = http.createServer(async (request, response) => {
    const url = new URL(request.url, `http://${HOST}`);

    if (url.pathname === "/" && request.method === "GET") {
      sendJson(response, 200, {
        lab: "Direitos do titular — dados inteiramente fictícios",
        routes: ["GET /api/me", "GET /api/me/export", "PATCH /api/me/email", "DELETE /api/me"],
        instructions: "Leia labs/lgpd-data-rights/README.md. Nenhum dado persiste após reiniciar."
      });
      return;
    }

    if (!url.pathname.startsWith("/api/")) {
      sendError(response, 404, "ROUTE_NOT_FOUND", "Rota não encontrada.");
      return;
    }

    const identity = findProfile(request, state);
    if (identity.error === "UNAUTHENTICATED") {
      sendError(response, 401, "UNAUTHENTICATED", "Use um token fictício deste laboratório.");
      return;
    }
    if (identity.error === "PROFILE_NOT_FOUND") {
      sendError(response, 404, "PROFILE_NOT_FOUND", "O perfil fictício já foi eliminado.");
      return;
    }

    const { profileId, profile } = identity;

    if (request.method === "GET" && url.pathname === "/api/me") {
      sendJson(response, 200, { profile: { name: profile.name, email: profile.email, studyItems: profile.studyItems } });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/me/export") {
      // A exportação monta um objeto novo a partir do perfil autenticado; ela
      // não percorre a coleção inteira de pessoas.
      sendJson(response, 200, {
        export: {
          format: "tech-learning-hub-demo-v1",
          profile: { name: profile.name, email: profile.email },
          studyItems: profile.studyItems
        }
      });
      return;
    }

    if (request.method === "PATCH" && url.pathname === "/api/me/email") {
      let body;
      try {
        body = await readJsonBody(request);
      } catch (error) {
        sendError(response, error.statusCode || 400, error.code || "INVALID_REQUEST", error.message);
        return;
      }

      if (!isDemoEmail(body.email)) {
        sendError(response, 400, "INVALID_EMAIL", "Informe um e-mail fictício em formato válido.");
        return;
      }

      profile.email = body.email;
      sendJson(response, 200, { profile: { name: profile.name, email: profile.email } });
      return;
    }

    if (request.method === "DELETE" && url.pathname === "/api/me") {
      const removedStudyItems = profile.studyItems.length;
      state.profiles.delete(profileId);
      sendJson(response, 200, {
        result: "deleted",
        removed: { profile: true, studyItems: removedStudyItems }
      });
      return;
    }

    sendError(response, 404, "ROUTE_NOT_FOUND", "Rota ou método não encontrado neste laboratório.");
  });

  return { server, state };
}

if (require.main === module) {
  const { server } = createLabServer();
  server.listen(PORT, HOST, () => {
    console.log(`Laboratório fictício disponível em http://${HOST}:${PORT}`);
    console.log("Dados em memória; pressione Ctrl+C para encerrar.");
  });
}

module.exports = { createInitialState, createLabServer, HOST };
