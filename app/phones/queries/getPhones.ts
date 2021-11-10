import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetPhonesInput
  extends Pick<Prisma.PhoneFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPhonesInput, ctx) => {
    const {
      items: phones,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.phone.count({ where }),
      query: (paginateArgs) =>
        db.phone.findMany({
          ...paginateArgs,
          where: {
            ...where,
            organizationId: ctx.session.orgId,
          },
          orderBy,
        }),
    })

    return {
      phones,
      nextPage,
      hasMore,
      count,
    }
  }
)
