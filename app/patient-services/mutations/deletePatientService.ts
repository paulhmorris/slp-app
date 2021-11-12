import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeleteService = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteService),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const service = await db.service.deleteMany({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
    })

    return service
  }
)
