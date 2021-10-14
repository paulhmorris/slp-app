import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeletePatientSession = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeletePatientSession),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const patientSession = await db.patientSession.deleteMany({ where: { id } })

    return patientSession
  }
)
