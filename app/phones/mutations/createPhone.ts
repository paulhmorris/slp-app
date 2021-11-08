import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreatePhone = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreatePhone), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const phone = await db.phone.create({ data: input })

  return phone
})
