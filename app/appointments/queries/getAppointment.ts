import { NotFoundError, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetAppointment = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(
  resolver.zod(GetAppointment),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const appointment = await db.appointment.findFirst({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
      include: {
        patient: {
          include: {
            goals: true,
            patientRelations: {
              where: {
                relationType: 'PATIENT',
              },
              include: {
                contact: true,
              },
            },
          },
        },
      },
    })

    if (!appointment) throw new NotFoundError()

    return appointment
  }
)
