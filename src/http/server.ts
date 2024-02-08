import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const app = fastify()

const prisma = new PrismaClient()

app.post("/polls", async (request, reply) => {
  const createPollBodySchema = z.object({
    title: z.string()
  })
  
  const { title } = createPollBodySchema.parse(request.body)

  const poll = await prisma.poll.create({
    data: {
      title
    }
  })

  return reply.status(201).send({ message: "Poll created successfully", poll })
})

app.listen({ port: 3333}, () => {
  console.log("🚀HTTP Server running on port 3333");
})