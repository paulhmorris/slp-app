import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetPatientContact = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(
  resolver.zod(GetPatientContact),
  resolver.authorize(),
  async ({ id }) => {
    const patientContact = await db.patientContact.findFirst({ where: { id } })

    if (!patientContact) throw new NotFoundError()

    return patientContact
  }
)
