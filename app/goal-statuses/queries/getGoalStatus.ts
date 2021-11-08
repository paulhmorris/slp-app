import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetGoalStatus = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(
  resolver.zod(GetGoalStatus),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const goalStatus = await db.goalStatus.findFirst({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
    })

    if (!goalStatus) throw new NotFoundError()

    return goalStatus
  }
)
