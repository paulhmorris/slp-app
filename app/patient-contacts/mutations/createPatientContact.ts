import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreatePatientContact = z.object({
  firstName: z.string(),
  lastName: z.string(),
  patientId: z.number(),
  contactId: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreatePatientContact),
  resolver.authorize(),
  async (input, ctx) => {
    const patientContact = await db.patientContact.create({
      data: {
        ...input,
        organizationId: ctx.session.orgId,
      },
    })

    return patientContact
  }
)
