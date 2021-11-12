import { NotFoundError, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetPatient = z.object({
  patientId: z.number(),
  take: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(GetPatient),
  resolver.authorize(),
  async ({ patientId, take = 3 }, ctx) => {
    const patientRelations = await db.patientRelation.findMany({
      where: {
        patientId,
        organizationId: ctx.session.orgId,
      },
      include: {
        contact: {
          include: {
            phones: true,
          },
        },
      },
      take,
    })

    if (!patientRelations) throw new NotFoundError()

    return patientRelations
  }
)
