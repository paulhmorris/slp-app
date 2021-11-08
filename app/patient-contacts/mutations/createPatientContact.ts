import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreatePatientContact = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreatePatientContact),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const patientContact = await db.patientContact.create({ data: input })

    return patientContact
  }
)
