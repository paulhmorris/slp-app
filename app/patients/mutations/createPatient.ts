import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

export const CreatePatient = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  dateOfBirth: z.date(),
})

export default resolver.pipe(
  resolver.zod(CreatePatient),
  resolver.authorize(),
  async (input, ctx) => {
    const patient = await db.patient.create({
      data: {
        ...input,
        organizationId: ctx.session.orgId,
      },
    })

    return patient
  }
)
