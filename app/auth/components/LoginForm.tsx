import login from 'app/auth/mutations/login'
import { Login } from 'app/auth/validations'
import { Form, FORM_ERROR } from 'app/core/components/forms/Form'
import { LabeledTextField } from 'app/core/components/forms/LabeledTextField'
import { AuthenticationError, Link, Routes, useMutation } from 'blitz'

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div className="p-12 max-w-sm">
      <h1>Login</h1>

      <Form
        submitText="Login"
        schema={Login}
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          try {
            await loginMutation(values)
            props.onSuccess?.()
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: 'Sorry, those credentials are invalid' }
            } else {
              return {
                [FORM_ERROR]:
                  'Sorry, we had an unexpected error. Please try again. - ' + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField
          name="email"
          label="Email"
          placeholder="Email"
          type="email"
          autoComplete="current-password"
          required
        />
        <LabeledTextField
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
          autoComplete="current-password"
          required
        />
        <div>
          <Link href={Routes.ForgotPasswordPage()}>
            <a className="hover:text-indigo-600 hover:underline">Forgot your password?</a>
          </Link>
        </div>
      </Form>

      <div style={{ marginTop: '1rem' }}>
        Or <Link href={Routes.SignupPage()}>Sign Up</Link>
      </div>
    </div>
  )
}

export default LoginForm
