import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdatePatientContact = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdatePatientContact),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const patientContact = await db.patientContact.update({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
      data,
    })

    return patientContact
  }
)
