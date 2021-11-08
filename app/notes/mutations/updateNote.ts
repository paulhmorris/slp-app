import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateNote = z.object({
  id: z.number(),
  body: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateNote),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const note = await db.note.update({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
      data,
    })

    return note
  }
)
