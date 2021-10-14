import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreatePatientSession = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreatePatientSession),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const patientSession = await db.patientSession.create({ data: input })

    return patientSession
  }
)
