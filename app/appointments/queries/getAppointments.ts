import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetappointmentsInput
  extends Pick<Prisma.AppointmentFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetappointmentsInput, ctx) => {
    const {
      items: appointments,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.appointment.count({ where: { organizationId: ctx.session.orgId } }),
      query: (paginateArgs) =>
        db.appointment.findMany({
          ...paginateArgs,
          where: {
            organizationId: ctx.session.orgId,
            ...where,
          },
          orderBy,
          include: {
            patient: {
              include: {
                patientRelations: {
                  where: {
                    relationType: 'PATIENT',
                  },
                  include: {
                    contact: true,
                  },
                },
              },
            },
          },
        }),
    })

    return {
      appointments,
      nextPage,
      hasMore,
      count,
    }
  }
)
