import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdatePatient = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdatePatient),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const patient = await db.patient.update({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
      data,
    })

    return patient
  }
)
