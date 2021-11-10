import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetGoalCategoriesInput
  extends Pick<Prisma.GoalCategoryFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetGoalCategoriesInput, ctx) => {
    const {
      items: goalCategories,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.goalCategory.count({ where }),
      query: (paginateArgs) =>
        db.goalCategory.findMany({
          ...paginateArgs,
          where: {
            ...where,
            organizationId: ctx.session.orgId,
          },
          orderBy,
        }),
    })

    return {
      goalCategories,
      nextPage,
      hasMore,
      count,
    }
  }
)
