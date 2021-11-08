import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateSessionType = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateSessionType),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const sessionType = await db.sessionType.update({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
      data,
    })

    return sessionType
  }
)
