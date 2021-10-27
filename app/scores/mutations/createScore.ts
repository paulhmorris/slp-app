import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreateScore = z.object({
  value: z.number().nonnegative({ message: "Score can't be negative!" }),
  goalId: z.number(),
  createdBy: z.number(),
})

export default resolver.pipe(resolver.zod(CreateScore), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const score = await db.score.create({ data: input })

  return score
})
