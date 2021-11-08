import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeleteGoal = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteGoal),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const goal = await db.goal.deleteMany({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
    })

    return goal
  }
)
