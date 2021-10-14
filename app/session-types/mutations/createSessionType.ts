import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateSessionType = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateSessionType),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const sessionType = await db.sessionType.create({ data: input })

    return sessionType
  }
)
