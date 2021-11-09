import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeleteAppointment = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteAppointment),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const appointment = await db.appointment.deleteMany({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
    })

    return appointment
  }
)
