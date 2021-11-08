import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateGoalCategory = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateGoalCategory),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const goalCategory = await db.goalCategory.update({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
      data,
    })

    return goalCategory
  }
)
