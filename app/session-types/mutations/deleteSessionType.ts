import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeleteSessionType = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteSessionType),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const sessionType = await db.sessionType.deleteMany({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
    })

    return sessionType
  }
)
