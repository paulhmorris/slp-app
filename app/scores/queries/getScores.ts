import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetScoresInput
  extends Pick<Prisma.ScoreFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetScoresInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: scores,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.score.count({ where }),
      query: (paginateArgs) => db.score.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      scores,
      nextPage,
      hasMore,
      count,
    }
  }
)
