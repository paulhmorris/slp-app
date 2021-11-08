import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeleteScore = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteScore),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const score = await db.score.deleteMany({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
    })

    return score
  }
)
