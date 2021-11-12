import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdatePatientRelation = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdatePatientRelation),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const patientRelation = await db.patientRelation.update({
      where: {
        id,
        organizationId: ctx.session.orgId,
      },
      data,
    })

    return patientRelation
  }
)
