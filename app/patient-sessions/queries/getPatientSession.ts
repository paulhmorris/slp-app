import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetPatientSession = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetPatientSession),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const patientSession = await db.patientSession.findFirst({ where: { id } })

    if (!patientSession) throw new NotFoundError()

    return patientSession
  }
)
