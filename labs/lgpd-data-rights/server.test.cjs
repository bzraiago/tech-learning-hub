const assert = require("node:assert/strict");
const { after, before, test } = require("node:test");
const { createLabServer, HOST } = require("./server.cjs");

let server;
let state;
let baseUrl;

before(async () => {
  ({ server, state } = createLabServer());
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, HOST, resolve);
  });
  baseUrl = `http://${HOST}:${server.address().port}`;
});

after(async () => {
  if (server?.listening) await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

function auth(token = "demo-token-ana") {
  return { authorization: `Bearer ${token}` };
}

test("escuta somente em loopback e explica as rotas", async () => {
  assert.equal(server.address().address, "127.0.0.1");
  const response = await fetch(`${baseUrl}/`);
  assert.equal(response.status, 200);
  assert.match((await response.json()).instructions, /README\.md/);
});

test("recusa ausência e token inválido sem revelar perfil", async () => {
  const missing = await fetch(`${baseUrl}/api/me`);
  const invalid = await fetch(`${baseUrl}/api/me`, { headers: auth("token-inventado") });
  assert.equal(missing.status, 401);
  assert.equal(invalid.status, 401);
  assert.deepEqual(await missing.json(), await invalid.json());
});

test("exporta somente os dados associados ao token fictício", async () => {
  const response = await fetch(`${baseUrl}/api/me/export`, { headers: auth() });
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.export.profile.email, "ana@exemplo.test");
  assert.deepEqual(body.export.studyItems.map((item) => item.id), ["study-html", "study-js"]);
  assert.doesNotMatch(JSON.stringify(body), /Bruno|person-bruno|study-sql|bruno@/);
});

test("altera apenas o e-mail do perfil autenticado", async () => {
  const response = await fetch(`${baseUrl}/api/me/email`, {
    method: "PATCH",
    headers: { ...auth("demo-token-bruno"), "content-type": "application/json" },
    body: JSON.stringify({ email: "bruno-corrigido@exemplo.test", profileId: "person-ana" })
  });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).profile.email, "bruno-corrigido@exemplo.test");
  assert.equal(state.profiles.get("person-ana").email, "ana@exemplo.test");
});

test("recusa corpo malformado, tipo errado, e-mail inválido e corpo excessivo", async (context) => {
  const endpoint = `${baseUrl}/api/me/email`;
  const cases = [
    { name: "tipo errado", headers: { ...auth(), "content-type": "text/plain" }, body: "email", status: 415, code: "JSON_REQUIRED" },
    { name: "tipo parecido não é JSON", headers: { ...auth(), "content-type": "application/jsonx" }, body: "{}", status: 415, code: "JSON_REQUIRED" },
    { name: "JSON inválido", headers: { ...auth(), "content-type": "application/json" }, body: "{", status: 400, code: "INVALID_JSON" },
    { name: "e-mail inválido", headers: { ...auth(), "content-type": "application/json" }, body: JSON.stringify({ email: "sem-arroba" }), status: 400, code: "INVALID_EMAIL" }
  ];

  for (const item of cases) {
    await context.test(item.name, async () => {
      const response = await fetch(endpoint, { method: "PATCH", headers: item.headers, body: item.body });
      assert.equal(response.status, item.status);
      assert.equal((await response.json()).error.code, item.code);
    });
  }

  const tooLarge = await fetch(endpoint, {
    method: "PATCH",
    headers: { ...auth(), "content-type": "application/json" },
    body: JSON.stringify({ email: `${"a".repeat(5000)}@exemplo.test` })
  });
  assert.equal(tooLarge.status, 413);
  assert.equal((await tooLarge.json()).error.code, "BODY_TOO_LARGE");
  assert.equal(state.profiles.get("person-ana").email, "ana@exemplo.test");
});

test("exclusão remove perfil e itens relacionados e não pode ser desfeita pelo token", async () => {
  const response = await fetch(`${baseUrl}/api/me`, { method: "DELETE", headers: auth() });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    result: "deleted",
    removed: { profile: true, studyItems: 2 }
  });
  assert.equal(state.profiles.has("person-ana"), false);
  assert.equal(state.profiles.has("person-bruno"), true);

  const afterDelete = await fetch(`${baseUrl}/api/me/export`, { headers: auth() });
  assert.equal(afterDelete.status, 404);
  assert.equal((await afterDelete.json()).error.code, "PROFILE_NOT_FOUND");
});
