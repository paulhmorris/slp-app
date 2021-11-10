import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetPatientsInput
  extends Pick<Prisma.PatientFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPatientsInput, ctx) => {
    const {
      items: patients,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.patient.count({ where }),
      query: (paginateArgs) =>
        db.patient.findMany({
          ...paginateArgs,
          where: {
            ...where,
            organizationId: ctx.session.orgId,
          },
          include: {
            patientContacts: {
              where: {
                contactType: 'PATIENT',
              },
              include: {
                contact: {
                  include: {
                    phones: true,
                  },
                },
              },
            },
          },
          orderBy,
        }),
    })

    return {
      patients,
      nextPage,
      hasMore,
      count,
    }
  }
)
