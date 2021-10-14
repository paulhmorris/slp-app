import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteSessionType = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteSessionType),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const sessionType = await db.sessionType.deleteMany({ where: { id } })

    return sessionType
  }
)
