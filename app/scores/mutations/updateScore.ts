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
  async ({ id, ...data }, ctx) => {
    const score = await db.score.update({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
      data,
    })

    return score
  }
)
