import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetPatient = z.object({
  patientId: z.number(),
})

export default resolver.pipe(
  resolver.zod(GetPatient),
  resolver.authorize(),
  async ({ patientId }, ctx) => {
    const patientContacts = await db.patientContact.findMany({
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
    })

    if (!patientContacts) throw new NotFoundError()

    return patientContacts
  }
)
