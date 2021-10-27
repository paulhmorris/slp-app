import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateScore = z.object({
  id: z.number(),
  value: z.number().nonnegative(),
})

export default resolver.pipe(
  resolver.zod(UpdateScore),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const score = await db.score.update({ where: { id }, data })

    return score
  }
)
