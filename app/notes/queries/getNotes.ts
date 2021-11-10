import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetNotesInput
  extends Pick<Prisma.NoteFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetNotesInput, ctx) => {
    const {
      items: notes,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.note.count({ where }),
      query: (paginateArgs) =>
        db.note.findMany({
          ...paginateArgs,
          where: {
            ...where,
            organizationId: ctx.session.orgId,
          },
          orderBy,
          include: { author: true },
        }),
    })

    return {
      notes,
      nextPage,
      hasMore,
      count,
    }
  }
)
