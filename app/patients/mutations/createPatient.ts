import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

export const CreatePatient = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  dateOfBirth: z.date(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    region: z.string().length(2).optional(),
    postcode: z.string().optional(),
    country: z.string().optional(),
  }),
})

export default resolver.pipe(resolver.zod(CreatePatient), resolver.authorize(), async (input) => {
  const patient = await db.patient.create({
    data: {
      ...input,
      addresses: {
        create: {
          ...input.address,
          organizationId: ctx.session.orgId,
        },
      },
      organizationId: ctx.session.orgId,
    },
  })

  return patient
})
