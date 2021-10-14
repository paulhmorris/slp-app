import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function PatientForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="firstName" label="First name" />
      <LabeledTextField name="lastName" label="Last name" />
      <LabeledTextField name="email" label="Email address" />
    </Form>
  )
}
