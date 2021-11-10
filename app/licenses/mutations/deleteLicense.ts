import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeleteLicense = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteLicense),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const license = await db.license.deleteMany({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
    })

    return license
  }
)
