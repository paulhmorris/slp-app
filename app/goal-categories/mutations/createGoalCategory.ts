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
    const goalCategory = await db.goalCategory.create({
      data: {
        ...input,
        organizationId: ctx.session.orgId,
      },
    })

    return goalCategory
  }
)
