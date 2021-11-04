import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreateNote = z.object({
  userId: z.number(),
  body: z.string().nonempty({ message: "Note can't be empty" }),
  goalId: z.number(),
})

export default resolver.pipe(resolver.zod(CreateNote), resolver.authorize(), async (input, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const note = await db.note.create({
    data: {
      ...input,
      organizationId: ctx.session.orgId,
    },
  })

  return note
})
