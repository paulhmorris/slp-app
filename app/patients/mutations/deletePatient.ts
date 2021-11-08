import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeletePatient = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeletePatient),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const patient = await db.patient.deleteMany({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
    })

    return patient
  }
)
