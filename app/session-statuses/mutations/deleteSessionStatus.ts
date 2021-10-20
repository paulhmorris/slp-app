import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeleteSessionStatus = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteSessionStatus),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const sessionStatus = await db.sessionStatus.deleteMany({ where: { id } })

    return sessionStatus
  }
)
