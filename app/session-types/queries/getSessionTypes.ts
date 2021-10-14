import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetSessionTypesInput
  extends Pick<Prisma.SessionTypeFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetSessionTypesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: sessionTypes,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.sessionType.count({ where }),
      query: (paginateArgs) => db.sessionType.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      sessionTypes,
      nextPage,
      hasMore,
      count,
    }
  }
)
