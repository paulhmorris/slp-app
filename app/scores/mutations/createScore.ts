import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

export const CreateScore = z.object({
  value: z.number(),
  goalId: z.number(),
  createdBy: z.number(),
  scoreTypeId: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreateScore),
  resolver.authorize(),
  async (input, ctx) => {
    const score = await db.score.create({
      data: {
        ...input,
        organizationId: ctx.session.orgId,
      },
    })

    return score
  }
)
