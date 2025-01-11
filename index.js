import { appendFileSync } from 'fs';

const logRequest = (method, url) => {
  const logData = `[${new Date().toISOString()}] ${method} ${url}\n`;
  appendFileSync('log.txt', logData);
};

Bun.serve({
  fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method;

    logRequest(method, path);

    switch (path) {
      case '/':
        return new Response('Welcome to the BarterX');
      
      case '/products':
        return new Response('Here are the products up for Sale in BarterX');
      
      case '/login':
        return new Response('Login to the BarterX');
      
      case '/signup':
        return new Response('Sign up to the BarterX');
      
      case '/profile':
        return new Response('Trader Profile');
      
      case '/cart':
        return new Response('Your Shopping Cart is here');
      
      case '/checkout':
        return new Response("Let's start shipping");
      
      case '/orders':
        return new Response('Your Orders are here');
      
      case '/categories':
        return new Response('Browse Categories');
      
      case '/chat':
        return new Response('Your Chat with fellow Traders');
      
      case '/contact':
        return new Response('Contact Us at');
      
      case '/about':
        return new Response(
          `<!DOCTYPE html>
          <html>
          <head>
              <title>About BarterX</title>
              <link rel="stylesheet" href="/styles.css">
          </head>
          <body>
              <h1>About BarterX</h1>
              <p>The modern approach to trading our commodities.</p>
              <img src="/logo.png" alt="BarterX Logo">
          </body>
          </html>`,
          { headers: { 'Content-Type': 'text/html' } }
        );
      
      case '/api/products':
        return new Response(
          JSON.stringify([
            { id: 1, name: 'Used Laptop', price: 300 },
            { id: 2, name: 'Second-hand Bicycle', price: 50 },
          ]),
          { headers: { 'Content-Type': 'application/json' } }
        );
      
      case '/logo.png':
        return new Response(Bun.file('./public/logo.png'), {
          headers: { 'Content-Type': 'image/png' },
        });
      
      case '/styles.css':
        return new Response(Bun.file('./public/styles.css'), {
          headers: { 'Content-Type': 'text/css' },
        });
      
      default:
        return new Response(
          JSON.stringify({ error: 'Page not found', statusCode: 404 }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
    }
  },
  port: 8050,
}, () => {
  console.log('Server initiated on port 8050...');
});
