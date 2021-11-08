import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeleteNote = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteNote),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const note = await db.note.deleteMany({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
    })

    return note
  }
)
