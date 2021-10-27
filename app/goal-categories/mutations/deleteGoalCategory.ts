import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeleteGoalCategory = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteGoalCategory),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const goalCategory = await db.goalCategory.deleteMany({ where: { id } })

    return goalCategory
  }
)
