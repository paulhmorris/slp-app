import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreateSessionStatus = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateSessionStatus),
  resolver.authorize(),
  async (input, ctx) => {
    const sessionStatus = await db.sessionStatus.create({
      data: {
        ...input,
        organizationId: ctx.session.orgId,
      },
    })

    return sessionStatus
  }
)
