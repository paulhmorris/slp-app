import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from 'blitz'
import { GlobalRole, MembershipRole, Organization, Prisma, User } from 'db'

type Role = MembershipRole | GlobalRole

declare module 'blitz' {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User['id']
      roles: Array<Role>
      orgId: Organization['id']
    }
  }
}

const GoalWithAllRelations = Prisma.validator<Prisma.GoalArgs>()({
  include: {
    status: true,
    category: true,
    parentGoal: true,
    scores: true,
    notes: true,
  },
})
export type GoalWithAllRelations = Prisma.GoalGetPayload<typeof GoalWithAllRelations>

export type WhereUniqueInputWithOrg = {
  id?: number
  organizationId?: number
}
