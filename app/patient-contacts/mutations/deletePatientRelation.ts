import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeletePatientRelation = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeletePatientRelation),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const patientRelation = await db.patientRelation.deleteMany({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
    })

    return patientRelation
  }
)
