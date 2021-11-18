import { LoginForm } from 'app/auth/components/LoginForm'
import { BlitzPage, useRouter } from 'blitz'

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <LoginForm
        onSuccess={() => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : '/'
          router.push(next)
        }}
      />
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = '/'
LoginPage.getLayout = (page) => <AdminLayout title="Log In">{page}</AdminLayout>

export default LoginPage
