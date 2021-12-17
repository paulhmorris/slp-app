import signup from 'app/auth/mutations/signup'
import { Signup } from 'app/auth/validations'
import { Form, FORM_ERROR } from 'app/core/components/forms/Form'
import { LabeledTextField } from 'app/core/components/forms/LabeledTextField'
import { useMutation } from 'blitz'

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div className="p-12 max-w-lg">
      <h1 className="mb-4">Create an Account</h1>

      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error: any) {
            if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
              // This error comes from Prisma
              return { email: 'This email is already being used' }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <div className="mb-4">
          <LabeledTextField name="email" type="email" label="Email" placeholder="Email" required />
        </div>
        <div>
          <LabeledTextField
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
            required
          />
        </div>
      </Form>
    </div>
  )
}

export default SignupForm
