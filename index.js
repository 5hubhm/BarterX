// import http from 'http';
// import fs from 'fs';

// const server = http.createServer((req, res) => {
//     if (req.method !== 'POST') {
//         res.writeHead(405, { 'Content-Type': 'text/plain' });
//         res.end("Only POST method is allowed");
//         logRequest(req.url, req.method);
//         return;
//     }

//     const url = req.url;
//     let response;
//     let status = 200;

//     switch (url) {
//         case '/':
//             response = "Welcome to BarterX";
//             break;
//         case '/products':
//             response = "Here are the products up for Sale in BarterX";
//             break;
//         case '/login':
//             response = "Login to the BarterX";
//             break;
//         case '/signup':
//             response = "Sign up to the BarterX";
//             break;
//         case '/profile':
//             response = "Trader Profile";
//             break;
//         case '/cart':
//             response = "Your Shopping Cart is here";
//             break;
//         case '/checkout':
//             response = "Let's start shipping";
//             break;
//         case '/orders':
//             response = "Your Orders are here";
//             break;
//         case '/categories':
//             response = "Browse Categories";
//             break;
//         case '/contact':
//             response = "Contact Us at";
//             break;
//         case '/about':
//             response = "The modern approach to trading our commodities";
//             break;
//         default:
//             response = "404 Not Found!!";
//             status = 404;
//     }

//     logRequest(url, req.method);

//     res.writeHead(status, { 'Content-Type': 'text/plain' });
//     res.end(response);
// });

// const logRequest = (url, method) => {
//     const logEntry = `${new Date().toISOString()} - ${method} - ${url}\n`;
//     fs.appendFile('log.txt', logEntry, (err) => {
//         if (err) console.error('Failed to write to log file:', err);
//     });
// };

// const port = 8050;

// server.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });



// =================================================================================================================
// =================================================================================================================


import { serve } from "bun";

const logRequest = async (url, method) => {
    const logEntry = `${new Date().toISOString()} - ${method} - ${url}\n`;
    try {
        await Bun.write("log.txt", logEntry, { append: true });
    } catch (err) {
        console.error("Failed to write to log file:", err);
    }
};

const server = serve({
    port: 8050,
    fetch(req) {
        const method = req.method;
        const url = new URL(req.url).pathname;

        let response = "";
        let status = 200;

        switch (url) {
            case "/":
                response = "Welcome to BarterX";
                break;
            case "/products":
                response = "Here are the products up for Sale in BarterX";
                break;
            case "/login":
                response = "Login to the BarterX";
                break;
            case "/signup":
                response = "Sign up to the BarterX";
                break;
            case "/profile":
                response = "Trader Profile";
                break;
            case "/cart":
                response = "Your Shopping Cart is here";
                break;
            case "/checkout":
                response = "Let's start shipping";
                break;
            case "/orders":
                response = "Your Orders are here";
                break;
            case "/categories":
                response = "Browse Categories";
                break;
            case "/contact":
                response = "Contact Us at";
                break;
            case "/about":
                response = "The modern approach to trading our commodities";
                break;
            default:
                response = "404 Not Found!!";
                status = 404;
        }

        logRequest(url, method);
        return new Response(response, { status, headers: { "Content-Type": "text/plain" } });
    },
});

console.log(`Server is listening on http://localhost:${server.port}`);
