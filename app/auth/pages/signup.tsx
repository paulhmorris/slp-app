import { SignupForm } from 'app/auth/components/SignupForm'
import AdminLayout from 'app/core/layouts/AdminLayout'
import { BlitzPage, Routes, useRouter } from 'blitz'

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = '/'
SignupPage.getLayout = (page) => <AdminLayout title="Sign Up">{page}</AdminLayout>

export default SignupPage
