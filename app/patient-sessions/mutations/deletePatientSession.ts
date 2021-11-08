import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeletePatientSession = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeletePatientSession),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const patientSession = await db.patientSession.deleteMany({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
    })

    return patientSession
  }
)
