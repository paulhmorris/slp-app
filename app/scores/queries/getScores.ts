import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetScoresInput
  extends Pick<Prisma.ScoreFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetScoresInput, ctx) => {
    const {
      items: scores,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.score.count({ where }),
      query: (paginateArgs) =>
        db.score.findMany({
          ...paginateArgs,
          where: {
            ...where,
            organizationId: ctx.session.orgId,
          },
          orderBy,
        }),
    })

    return {
      scores,
      nextPage,
      hasMore,
      count,
    }
  }
)
