// 'Import' the http module
import http from "http";
// Initialize the http server
const server = http
  .createServer((request, response) => {
    // Handle the request from http://localhost:4040/status with HTTP GET method
    if (request.url === "/status" && request.method === "GET") {
      // Create the headers for response
      response.writeHead(200, { "Content-Type": "application/json" });
      // Create the response body
      response.write(JSON.stringify({ message: "Service healthy Bruh" }));
      // End and return the response
      response.end();
    }
  })
  // Tell the HTTP server to start listening
  .listen(4040);

// Let the humans know I am running and listening on 4040
console.log("Listening on port 4040");
