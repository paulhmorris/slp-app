import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdatePatientSession = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdatePatientSession),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const patientSession = await db.patientSession.update({ where: { id }, data })

    return patientSession
  }
)
