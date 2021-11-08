import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeleteSessionStatus = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteSessionStatus),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const sessionStatus = await db.sessionStatus.deleteMany({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
    })

    return sessionStatus
  }
)
