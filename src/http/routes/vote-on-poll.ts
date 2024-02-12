import { z } from 'zod';
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from 'fastify';
import { randomUUID } from 'crypto';
import { redis } from '../../lib/redis';
import { voting } from '../../utils/voting-pub-sub';

export async function voteOnPoll(app: FastifyInstance) {
  app.post("/polls/:pollId/votes", async (request, reply) => {
    const voteOnPollBodySchema = z.object({
      pollOptionId: z.string().uuid()
    })

    const voteOnPollParamsSchema = z.object({
      pollId: z.string().uuid()
    })
    
    const { pollId } = voteOnPollParamsSchema.parse(request.params)
    const { pollOptionId } = voteOnPollBodySchema.parse(request.body)
  
    let { sessionId } = request.cookies

    if (sessionId) {
      const userPreviousVoteOnPoll = await prisma.vote.findUnique({
        where: {
          sessionId_pollId: {
            sessionId,
            pollId
          }
        }
      })

      if (userPreviousVoteOnPoll && userPreviousVoteOnPoll.pollOptionId !== pollOptionId) {
        await prisma.vote.delete({
          where: {
            id: userPreviousVoteOnPoll.id
          }
        })

        const votes = await redis.zincrby(pollId, -1, userPreviousVoteOnPoll.pollOptionId)

        voting.publish(pollId, {
          pollOptionId: userPreviousVoteOnPoll.pollOptionId,
          votes: Number(votes)
        })

      } else if (userPreviousVoteOnPoll && userPreviousVoteOnPoll.pollOptionId === pollOptionId) {
        return reply.status(400).send({ message: "You have already voted for this option" })
      }
    }

    if (!sessionId) {
      sessionId = randomUUID()
  
      reply.setCookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        signed: true,
        httpOnly: true
      })
    }

    await prisma.vote.create({
      data: {
        sessionId,
        pollId,
        pollOptionId
      }
    })

    const votes = await redis.zincrby(pollId, 1, pollOptionId)

    voting.publish(pollId, {
      pollOptionId,
      votes: Number(votes)
    })

    return reply.status(201).send({ message: "Vote registered successfully" })
  })
}

