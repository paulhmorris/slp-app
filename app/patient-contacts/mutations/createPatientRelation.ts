import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreatePatientRelation = z.object({
  firstName: z.string(),
  lastName: z.string(),
  patientId: z.number(),
  contactId: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreatePatientRelation),
  resolver.authorize(),
  async (input, ctx) => {
    const patientRelation = await db.patientRelation.create({
      data: {
        ...input,
        organizationId: ctx.session.orgId,
      },
    })

    return patientRelation
  }
)
