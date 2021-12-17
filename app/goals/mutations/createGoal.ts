import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreateGoal = z.object({
  title: z.string(),
  patientId: z.number(),
  goalCategoryId: z.number(),
})

export default resolver.pipe(resolver.zod(CreateGoal), resolver.authorize(), async (input, ctx) => {
  const goal = await db.goal.create({
    data: {
      ...input,
      organizationId: ctx.session.orgId,
    },
  })

  return goal
})
