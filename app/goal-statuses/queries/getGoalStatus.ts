import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetGoalStatus = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(resolver.zod(GetGoalStatus), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const goalStatus = await db.goalStatus.findFirst({ where: { id } })

  if (!goalStatus) throw new NotFoundError()

  return goalStatus
})
