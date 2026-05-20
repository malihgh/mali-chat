const server = Bun.serve({
  port: 3000,
  fetch(req) {
    return new Response("Hello from Bun API 🚀");
  },
});

console.log(`Running on ${server.port}`);
