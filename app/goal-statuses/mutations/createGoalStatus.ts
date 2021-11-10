import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreateGoalStatus = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateGoalStatus),
  resolver.authorize(),
  async (input) => {
    const goalStatus = await db.goalStatus.create({
      data: {
        ...input,
        organizationId: ctx.session.orgId,
      },
    })

    return goalStatus
  }
)
