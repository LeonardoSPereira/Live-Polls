import fastify from 'fastify';

const app = fastify()

app.listen({ port: 3333}, () => {
  console.log("HTTP Server running on port 3333");
})