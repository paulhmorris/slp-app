import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateSessionStatus = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateSessionStatus),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const sessionStatus = await db.sessionStatus.update({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
      data,
    })

    return sessionStatus
  }
)
