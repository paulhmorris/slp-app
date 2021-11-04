import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreateGoalCategory = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateGoalCategory),
  resolver.authorize(),
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const goalCategory = await db.goalCategory.create({
      data: {
        ...input,
        organizationId: ctx.session.orgId,
      },
    })

    return goalCategory
  }
)
