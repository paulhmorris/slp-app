import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeleteGoalStatus = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteGoalStatus),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const goalStatus = await db.goalStatus.deleteMany({ where: { id } })

    return goalStatus
  }
)
