import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetLicensesInput
  extends Pick<Prisma.LicenseFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetLicensesInput, ctx) => {
    const {
      items: licenses,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.license.count({ where: { organizationId: ctx.session.orgId } }),
      query: (paginateArgs) =>
        db.license.findMany({
          ...paginateArgs,
          where: {
            ...where,
            organizationId: ctx.session.orgId,
          },
          orderBy,
        }),
    })

    return {
      licenses,
      nextPage,
      hasMore,
      count,
    }
  }
)
