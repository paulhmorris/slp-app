import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetGoalCategoriesInput
  extends Pick<Prisma.GoalCategoryFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetGoalCategoriesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: goalCategories,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.goalCategory.count({ where }),
      query: (paginateArgs) => db.goalCategory.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      goalCategories,
      nextPage,
      hasMore,
      count,
    }
  }
)
