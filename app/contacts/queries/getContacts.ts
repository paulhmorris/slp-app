import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetContactsInput
  extends Pick<Prisma.ContactFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetContactsInput, ctx) => {
    const {
      items: contacts,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.contact.count({ where }),
      query: (paginateArgs) =>
        db.contact.findMany({
          ...paginateArgs,
          where: {
            ...where,
            organizationId: ctx.session.orgId,
          },
          orderBy,
        }),
    })

    return {
      contacts,
      nextPage,
      hasMore,
      count,
    }
  }
)
