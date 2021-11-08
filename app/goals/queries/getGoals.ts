import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetGoalsInput
  extends Pick<Prisma.GoalFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetGoalsInput, ctx) => {
    const {
      items: goals,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.goal.count({ where }),
      query: (paginateArgs) =>
        db.goal.findMany({
          ...paginateArgs,
          where: {
            organizationId: ctx.session.orgId,
          },
          orderBy,
          include: {
            status: true,
            category: true,
            parentGoal: true,
            scores: {
              orderBy: {
                createdAt: 'asc',
              },
            },
            notes: true,
          },
        }),
    })

    return {
      goals,
      nextPage,
      hasMore,
      count,
    }
  }
)
