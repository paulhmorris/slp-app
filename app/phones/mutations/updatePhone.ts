import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdatePhone = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdatePhone),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const phone = await db.phone.update({ where: { id }, data })

    return phone
  }
)
