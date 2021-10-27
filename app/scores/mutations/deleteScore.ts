import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeleteScore = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteScore), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const score = await db.score.deleteMany({ where: { id } })

  return score
})
