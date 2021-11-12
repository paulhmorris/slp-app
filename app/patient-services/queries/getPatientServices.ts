import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetServicesInput
  extends Pick<Prisma.ServiceFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetServicesInput, ctx) => {
    const {
      items: services,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.service.count({ where }),
      query: (paginateArgs) =>
        db.service.findMany({
          ...paginateArgs,
          where: {
            ...where,
            organizationId: ctx.session.orgId,
          },
          orderBy,
        }),
    })

    return {
      services,
      nextPage,
      hasMore,
      count,
    }
  }
)
