import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetLicense = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(
  resolver.zod(GetLicense),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const license = await db.license.findFirst({ where: { id, organizationId: ctx.session.orgId } })

    if (!license) throw new NotFoundError()

    return license
  }
)
