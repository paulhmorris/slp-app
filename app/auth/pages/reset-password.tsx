import resetPassword from 'app/auth/mutations/resetPassword'
import { ResetPassword } from 'app/auth/validations'
import { Form, FORM_ERROR } from 'app/core/components/Forms/Form'
import { LabeledTextField } from 'app/core/components/Forms/LabeledTextField'
import AdminLayout from 'app/core/layouts/AdminLayout'
import { BlitzPage, Link, Routes, useMutation, useRouterQuery } from 'blitz'

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  return (
    <div>
      <h1>Set a New Password</h1>

      {isSuccess ? (
        <div>
          <h2>Password Reset Successfully</h2>
          <p>
            Go to the <Link href={Routes.Home()}>homepage</Link>
          </p>
        </div>
      ) : (
        <Form
          submitText="Reset Password"
          schema={ResetPassword}
          initialValues={{ password: '', passwordConfirmation: '', token: query.token as string }}
          onSubmit={async (values) => {
            try {
              await resetPasswordMutation(values)
            } catch (error: any) {
              if (error.name === 'ResetPasswordError') {
                return {
                  [FORM_ERROR]: error.message,
                }
              } else {
                return {
                  [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again.',
                }
              }
            }
          }}
        >
          <div className="max-w-xs space-y-3">
            <LabeledTextField name="password" label="New Password" type="password" />
            <LabeledTextField
              name="passwordConfirmation"
              label="Confirm New Password"
              type="password"
            />
          </div>
        </Form>
      )}
    </div>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = '/'
ResetPasswordPage.getLayout = (page) => (
  <AdminLayout title="Reset Your Password">{page}</AdminLayout>
)

export default ResetPasswordPage
