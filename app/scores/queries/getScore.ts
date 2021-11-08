import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetScore = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(resolver.zod(GetScore), resolver.authorize(), async ({ id }, ctx) => {
  const score = await db.score.findFirst({
    where: {
      id,
      organizationId: ctx.session.orgId,
    },
  })

  if (!score) throw new NotFoundError()

  return score
})
