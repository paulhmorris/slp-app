import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdatePhone = z.object({
  id: z.number(),
  number: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdatePhone),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const phone = await db.phone.update({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
      data,
    })

    return phone
  }
)
