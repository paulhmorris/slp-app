import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateLicense = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdateLicense),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const license = await db.license.update({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
      data,
    })

    return license
  }
)
