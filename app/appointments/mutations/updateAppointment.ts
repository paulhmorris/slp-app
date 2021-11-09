import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateAppointment = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdateAppointment),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const appointment = await db.appointment.update({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
      data,
    })

    return appointment
  }
)
