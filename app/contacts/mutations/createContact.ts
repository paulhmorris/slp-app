import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreateContact = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateContact),
  resolver.authorize(),
  async (input, ctx) => {
    const contact = await db.contact.create({
      data: {
        ...input,
        organizationId: ctx.session.orgId,
      },
    })

    return contact
  }
)
