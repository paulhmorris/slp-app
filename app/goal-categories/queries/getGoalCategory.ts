import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetGoalCategory = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(
  resolver.zod(GetGoalCategory),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const goalCategory = await db.goalCategory.findFirst({ where: { id } })

    if (!goalCategory) throw new NotFoundError()

    return goalCategory
  }
)
