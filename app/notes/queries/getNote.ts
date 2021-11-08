import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetNote = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(resolver.zod(GetNote), resolver.authorize(), async ({ id }, ctx) => {
  const note = await db.note.findFirst({
    where: {
      id,
      organizationId: ctx.session.orgId,
    },
  })

  if (!note) throw new NotFoundError()

  return note
})
