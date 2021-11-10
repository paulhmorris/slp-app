import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeleteContact = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteContact),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const contact = await db.contact.deleteMany({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
    })

    return contact
  }
)
