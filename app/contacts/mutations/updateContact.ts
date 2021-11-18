import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateSettings = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  preferredName: z.string().optional(),
  email: z.string(),
  dateOfBirth: z.date(),
  patientRelation: z.object({
    isMinor: z.boolean(),
  }),
  phones: z
    .object({
      id: z.number(),
      number: z.string(),
      allowCalls: z.boolean(),
      allowTexts: z.boolean(),
      phoneType: z.enum(['MOBILE', 'HOME', 'WORK', 'FAX']),
    })
    .array(),
})

export default resolver.pipe(
  resolver.zod(UpdateSettings),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const contact = await db.contact.update({
      where: { id },
      data: {
        ...data,
        patientRelation: {
          update: {
            isMinor: data.patientRelation.isMinor,
          },
        },
        phones: {
          update: data.phones.map((phone) => ({
            where: { id: phone.id },
            data: {
              ...phone,
            },
          })),
        },
      },
    })
    return contact
  }
)
