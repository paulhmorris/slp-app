import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreatePatient = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
})

export default resolver.pipe(resolver.zod(CreatePatient), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const patient = await db.patient.create({ data: input })

  return patient
})
