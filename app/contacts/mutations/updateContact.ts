import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateContact = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateContact),
  resolver.authorize(),
  async ({ id, ...data }) => {
    const contact = await db.contact.update({ where: { id }, data })

    return contact
  }
)
