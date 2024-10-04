import z from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoal } from '../../functions/create-goal'

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/goals',
    {
      schema: {
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
      },
    },
    async (request, reply) => {
      const { title, desiredWeeklyFrequency } = request.body as {
        title: string
        desiredWeeklyFrequency: number
      }

      try {
        const goal = await createGoal({
          title,
          desiredWeeklyFrequency,
        })
        reply.send(goal)
      } catch (error) {
        reply.status(500).send({ error: 'Deu erro patrones' })
      }
    }
  )
}
