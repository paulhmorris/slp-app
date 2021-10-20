import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreateSessionStatus = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateSessionStatus),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const sessionStatus = await db.sessionStatus.create({ data: input })

    return sessionStatus
  }
)
