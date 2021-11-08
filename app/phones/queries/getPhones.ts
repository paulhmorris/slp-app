import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetPhonesInput
  extends Pick<Prisma.PhoneFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPhonesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: phones,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.phone.count({ where }),
      query: (paginateArgs) => db.phone.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      phones,
      nextPage,
      hasMore,
      count,
    }
  }
)
