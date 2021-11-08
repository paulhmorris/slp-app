import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreateSessionType = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateSessionType),
  resolver.authorize(),
  async (input, ctx) => {
    const sessionType = await db.sessionType.create({
      data: {
        ...input,
        organizationId: ctx.session.orgId,
      },
    })

    return sessionType
  }
)
