import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetPatientService = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(
  resolver.zod(GetPatientService),
  resolver.authorize(),
  async ({ id }) => {
    const patientService = await db.patientService.findFirst({ where: { id } })

    if (!patientService) throw new NotFoundError()

    return patientService
  }
)
