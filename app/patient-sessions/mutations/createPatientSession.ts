import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreatePatientSession = z.object({
  patientId: z.number().gte(0),
  typeId: z.number().gte(0),
})

export default resolver.pipe(
  resolver.zod(CreatePatientSession),
  resolver.authorize(),
  async ({ patientId, typeId, ...input }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const patientSession = await db.patientSession.create({
      data: {
        ...input,
        patient: {
          connect: {
            id: patientId,
          },
        },
        type: {
          connect: {
            id: typeId,
          },
        },
      },
    })
    return patientSession
  }
)
