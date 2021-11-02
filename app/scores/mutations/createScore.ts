import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

export const CreateScore = z.object({
  value: z.number(),
  goalId: z.number(),
  createdBy: z.number(),
  scoreTypeId: z.number(),
})

export default resolver.pipe(resolver.zod(CreateScore), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const score = await db.score.create({ data: input })

  return score
})
