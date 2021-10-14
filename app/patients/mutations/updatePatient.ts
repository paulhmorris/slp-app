import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdatePatient = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdatePatient),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const patient = await db.patient.update({ where: { id }, data })

    return patient
  }
)
