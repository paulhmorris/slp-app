import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeletePhone = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeletePhone),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const phone = await db.phone.deleteMany({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
    })

    return phone
  }
)
