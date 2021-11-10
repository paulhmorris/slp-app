import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetPatient = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(
  resolver.zod(GetPatient),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const patient = await db.patient.findFirst({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
      include: {
        patientContacts: {
          where: {
            contactType: 'PATIENT',
          },
          include: {
            contact: {
              include: {
                phones: true,
              },
            },
          },
        },
      },
    })

    if (!patient) throw new NotFoundError()

    return patient
  }
)
