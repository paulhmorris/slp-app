import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeleteGoalStatus = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteGoalStatus),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const goalStatus = await db.goalStatus.deleteMany({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
    })

    return goalStatus
  }
)
