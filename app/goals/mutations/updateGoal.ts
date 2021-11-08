import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateGoal = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdateGoal),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const goal = await db.goal.update({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
      data,
    })

    return goal
  }
)
