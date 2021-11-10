import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetUpcomingAppointments = z.object({
  patientId: z.number(),
})

export default resolver.pipe(
  resolver.zod(GetUpcomingAppointments),
  resolver.authorize(),
  async ({ patientId }, ctx) => {
    const appointments = await db.appointment.findMany({
      where: {
        patientId,
        organizationId: ctx.session.orgId,
        scheduledAt: {
          gt: new Date(),
        },
      },
      select: {
        id: true,
        scheduledAt: true,
        duration: true,
      },
      take: 5,
      orderBy: {
        scheduledAt: 'asc',
      },
    })

    if (!appointments) throw new NotFoundError()

    return appointments
  }
)
