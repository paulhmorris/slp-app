import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetSessionTypesInput
  extends Pick<Prisma.SessionTypeFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetSessionTypesInput, ctx) => {
    const {
      items: sessionTypes,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.sessionType.count({ where }),
      query: (paginateArgs) =>
        db.sessionType.findMany({
          ...paginateArgs,
          where: {
            organizationId: ctx.session.orgId,
          },
          orderBy,
        }),
    })

    return {
      sessionTypes,
      nextPage,
      hasMore,
      count,
    }
  }
)
