import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateGoalCategory = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateGoalCategory),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const goalCategory = await db.goalCategory.update({ where: { id }, data })

    return goalCategory
  }
)
