import { NotFoundError, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetContact = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(
  resolver.zod(GetContact),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const contact = await db.contact.findFirst({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
    })

    if (!contact) throw new NotFoundError()

    return contact
  }
)
