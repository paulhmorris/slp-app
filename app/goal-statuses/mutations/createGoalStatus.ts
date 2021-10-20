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
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const goalStatus = await db.goalStatus.create({ data: input })

    return goalStatus
  }
)
