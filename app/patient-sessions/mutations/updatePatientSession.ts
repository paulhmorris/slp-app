import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdatePatientSession = z.object({
  id: z.number(),
  sessionStatusId: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(UpdatePatientSession),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const patientSession = await db.patientSession.update({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
      data,
    })

    return patientSession
  }
)
