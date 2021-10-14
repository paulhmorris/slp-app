import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeletePatient = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeletePatient), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const patient = await db.patient.deleteMany({ where: { id } })

  return patient
})
