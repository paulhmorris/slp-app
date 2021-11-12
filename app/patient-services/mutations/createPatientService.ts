import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreateService = z.object({
  id: z.number(),
  description: z.string(),
  defaultDuration: z.number(),
  rate: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreateService),
  resolver.authorize(),
  async (input, ctx) => {
    const service = await db.service.create({
      data: {
        ...input,
        organizationId: ctx.session.orgId,
      },
    })

    return service
  }
)
