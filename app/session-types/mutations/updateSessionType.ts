import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateSessionType = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateSessionType),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const sessionType = await db.sessionType.update({ where: { id }, data })

    return sessionType
  }
)
