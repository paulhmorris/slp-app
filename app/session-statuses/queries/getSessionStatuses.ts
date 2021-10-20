import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetSessionStatusesInput
  extends Pick<Prisma.SessionStatusFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetSessionStatusesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: sessionStatuses,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.sessionStatus.count({ where }),
      query: (paginateArgs) => db.sessionStatus.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      sessionStatuses,
      nextPage,
      hasMore,
      count,
    }
  }
)
