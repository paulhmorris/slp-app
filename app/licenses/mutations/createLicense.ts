import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreateLicense = z.object({
  membershipId: z.number(),
  type: z.string(),
  number: z.string(),
  expiresAt: z.date(),
  state: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateLicense),
  resolver.authorize(),
  async (input, ctx) => {
    const license = await db.license.create({
      data: {
        ...input,
        organizationId: ctx.session.orgId,
      },
    })

    return license
  }
)
