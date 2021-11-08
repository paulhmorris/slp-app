import { NotFoundError, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetPatientSession = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(
  resolver.zod(GetPatientSession),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const patientSession = await db.patientSession.findFirst({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
      include: {
        status: {
          select: {
            name: true,
          },
        },
        type: {
          select: {
            name: true,
          },
        },
        patient: {
          include: {
            goals: true,
          },
        },
      },
    })

    if (!patientSession) throw new NotFoundError()

    return patientSession
  }
)
