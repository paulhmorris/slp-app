import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateGoalStatus = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateGoalStatus),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const goalStatus = await db.goalStatus.update({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
      data,
    })

    return goalStatus
  }
)
