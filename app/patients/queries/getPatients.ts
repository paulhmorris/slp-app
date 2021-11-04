import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetPatientsInput
  extends Pick<Prisma.PatientFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPatientsInput, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
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
          where: { organizationId: ctx.session.orgId },
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
