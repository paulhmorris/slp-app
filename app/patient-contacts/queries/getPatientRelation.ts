import { NotFoundError, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetPatientRelation = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(
  resolver.zod(GetPatientRelation),
  resolver.authorize(),
  async ({ id }) => {
    const patientRelation = await db.patientRelation.findFirst({ where: { id } })

    if (!patientRelation) throw new NotFoundError()

    return patientRelation
  }
)
