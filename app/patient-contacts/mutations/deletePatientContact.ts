import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeletePatientContact = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeletePatientContact),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const patientContact = await db.patientContact.deleteMany({ where: { id } })

    return patientContact
  }
)
