import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreatePhone = z.object({
  number: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreatePhone),
  resolver.authorize(),
  async (input, ctx) => {
    const phone = await db.phone.create({
      data: {
        ...input,
        organizationId: ctx.session.orgId,
      },
    })

    return phone
  }
)
