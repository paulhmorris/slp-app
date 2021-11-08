import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetSessionStatus = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(
  resolver.zod(GetSessionStatus),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const sessionStatus = await db.sessionStatus.findFirst({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
    })

    if (!sessionStatus) throw new NotFoundError()

    return sessionStatus
  }
)
