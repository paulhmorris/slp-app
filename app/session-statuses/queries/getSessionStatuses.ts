import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetSessionStatusesInput
  extends Pick<Prisma.SessionStatusFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetSessionStatusesInput, ctx) => {
    const {
      items: sessionStatuses,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.sessionStatus.count({ where }),
      query: (paginateArgs) =>
        db.sessionStatus.findMany({
          ...paginateArgs,
          where: {
            organizationId: ctx.session.orgId,
          },
          orderBy,
        }),
    })

    return {
      sessionStatuses,
      nextPage,
      hasMore,
      count,
    }
  }
)
