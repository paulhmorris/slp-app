import { NotFoundError, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetService = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(resolver.zod(GetService), resolver.authorize(), async ({ id }) => {
  const service = await db.service.findFirst({ where: { id } })

  if (!service) throw new NotFoundError()

  return service
})
