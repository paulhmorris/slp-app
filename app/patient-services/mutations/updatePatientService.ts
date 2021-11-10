import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdatePatientService = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdatePatientService),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const patientService = await db.patientService.update({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
      data,
    })

    return patientService
  }
)
