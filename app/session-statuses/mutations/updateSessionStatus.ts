import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateSessionStatus = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateSessionStatus),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const sessionStatus = await db.sessionStatus.update({ where: { id }, data })

    return sessionStatus
  }
)
