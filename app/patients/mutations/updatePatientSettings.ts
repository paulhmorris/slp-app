import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdatePatientSettings = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  preferredName: z.string().optional(),
  email: z.string(),
  dateOfBirth: z.date(),
  isMinor: z.boolean(),
  isActive: z.boolean(),
  phones: z
    .object({
      id: z.number().optional(),
      number: z.string(),
      allowCalls: z.boolean().optional(),
      allowTexts: z.boolean().optional(),
      phoneType: z.enum(['MOBILE', 'HOME', 'WORK', 'FAX']),
    })
    .array(),
  address: z
    .object({
      street: z.string(),
      street2: z.nullable(z.string()),
      city: z.string(),
      region: z.string(),
      postcode: z.string(),
      country: z.string(),
    })
    .optional(),
})

export default resolver.pipe(
  resolver.zod(UpdatePatientSettings),
  resolver.authorize(),
  async ({ id, isMinor, isActive, ...data }, ctx) => {
    const contact = await db.contact.update({
      where: { id },
      data: {
        ...data,
        patientRelation: {
          update: {
            isMinor,
            patient: {
              update: {
                isActive,
              },
            },
          },
        },
        phones: {
          upsert: data.phones.map((phone) => ({
            where: { id: phone.id || 0 },
            create: {
              ...phone,
              organizationId: ctx.session.orgId,
            },
            update: {
              ...phone,
            },
          })),
        },
        address: {
          upsert: {
            update: {
              ...data.address,
            },
            create: {
              ...data.address,
              organizationId: ctx.session.orgId,
            },
          },
        },
      },
    })
    return contact
  }
)
