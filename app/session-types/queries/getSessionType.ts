import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetSessionType = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(
  resolver.zod(GetSessionType),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const sessionType = await db.sessionType.findFirst({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
    })

    if (!sessionType) throw new NotFoundError()

    return sessionType
  }
)
