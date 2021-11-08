import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetPatientContactsInput
  extends Pick<Prisma.PatientContactFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPatientContactsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: patientContacts,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.patientContact.count({ where }),
      query: (paginateArgs) => db.patientContact.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      patientContacts,
      nextPage,
      hasMore,
      count,
    }
  }
)
