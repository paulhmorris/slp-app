import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreateAppointment = z.object({
  patientId: z.number(),
  typeId: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreateAppointment),
  resolver.authorize(),
  async ({ patientId }, ctx) => {
    const appointment = await db.appointment.create({
      data: {
        patientId,
        organizationId: ctx.session.orgId,
      },
    })
    return appointment
  }
)
