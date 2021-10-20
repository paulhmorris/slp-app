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
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const goalStatus = await db.goalStatus.update({ where: { id }, data })

    return goalStatus
  }
)
