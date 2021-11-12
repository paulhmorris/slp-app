import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateService = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdateService),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const service = await db.service.update({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
      data,
    })

    return service
  }
)
