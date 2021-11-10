import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetPatientServicesInput
  extends Pick<Prisma.PatientServiceFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPatientServicesInput, ctx) => {
    const {
      items: patientServices,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.patientService.count({ where }),
      query: (paginateArgs) =>
        db.patientService.findMany({
          ...paginateArgs,
          where: {
            ...where,
            organizationId: ctx.session.orgId,
          },
          orderBy,
        }),
    })

    return {
      patientServices,
      nextPage,
      hasMore,
      count,
    }
  }
)
