import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetPatientSessionsInput
  extends Pick<Prisma.PatientSessionFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPatientSessionsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: patientSessions,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.patientSession.count({ where }),
      query: (paginateArgs) =>
        db.patientSession.findMany({
          ...paginateArgs,
          where,
          orderBy,
          include: {
            patient: true,
            type: true,
            status: true,
          },
        }),
    })

    return {
      patientSessions,
      nextPage,
      hasMore,
      count,
    }
  }
)
