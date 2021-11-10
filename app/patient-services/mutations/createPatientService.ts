import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreatePatientService = z.object({
  id: z.number(),
  description: z.string(),
  defaultDuration: z.number(),
  rate: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreatePatientService),
  resolver.authorize(),
  async (input, ctx) => {
    const patientService = await db.patientService.create({
      data: {
        ...input,
        organizationId: ctx.session.orgId,
      },
    })

    return patientService
  }
)
