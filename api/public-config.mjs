// Somente valores públicos podem ser enviados ao navegador.
export default function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    response.statusCode = 405;
    response.end(JSON.stringify({ error: 'Método não permitido' }));
    return;
  }

  response.statusCode = 200;
  response.end(JSON.stringify({
    clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY || null
  }));
}
