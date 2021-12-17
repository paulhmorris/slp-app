import { Signup } from 'app/auth/validations'
import { resolver, SecurePassword } from 'blitz'
import db from 'db'

export default resolver.pipe(resolver.zod(Signup), async ({ email, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())
  const user = await db.user.create({
    data: {
      username: email.toLowerCase().trim(),
      hashedPassword,
      role: 'CUSTOMER',
      memberships: {
        create: {
          role: 'OWNER',
          organization: {
            create: {
              name: 'Test Organization',
            },
          },
        },
      },
    },
    include: { memberships: true },
  })

  if (!user.memberships[0]?.role) {
    throw new Error('Unexpected error: No user role in membership')
  }

  await ctx.session.$create({
    userId: user.id,
    roles: [user.role, user.memberships[0].role],
    orgId: user.memberships[0].organizationId,
  })

  return user
})
