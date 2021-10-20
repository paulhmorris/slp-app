import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetGoalStatusesInput
  extends Pick<Prisma.GoalStatusFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetGoalStatusesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: goalStatuses,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.goalStatus.count({ where }),
      query: (paginateArgs) => db.goalStatus.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      goalStatuses,
      nextPage,
      hasMore,
      count,
    }
  }
)
