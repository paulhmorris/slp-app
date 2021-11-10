import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeletePatientService = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeletePatientService),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const patientService = await db.patientService.deleteMany({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
    })

    return patientService
  }
)
