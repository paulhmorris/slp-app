import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeletePatientContact = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeletePatientContact),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const patientContact = await db.patientContact.deleteMany({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
    })

    return patientContact
  }
)
