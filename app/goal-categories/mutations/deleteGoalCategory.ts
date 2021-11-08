import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeleteGoalCategory = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteGoalCategory),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const goalCategory = await db.goalCategory.deleteMany({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
    })

    return goalCategory
  }
)
