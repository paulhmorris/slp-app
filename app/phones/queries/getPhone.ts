import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetPhone = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(resolver.zod(GetPhone), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const phone = await db.phone.findFirst({ where: { id } })

  if (!phone) throw new NotFoundError()

  return phone
})
