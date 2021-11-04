import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreatePatientSession = z.object({
  patientId: z.number(),
  typeId: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreatePatientSession),
  resolver.authorize(),
  async ({ patientId, typeId }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const patientSession = await db.patientSession.create({
      data: {
        patientId,
        sessionTypeId: typeId,
        organizationId: ctx.session.orgId,
      },
    })
    return patientSession
  }
)
