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
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
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
