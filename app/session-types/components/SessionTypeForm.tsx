import { Form, FormProps } from 'app/core/components/Forms/Form'
import { LabeledTextField } from 'app/core/components/Forms/LabeledTextField'
import { z } from 'zod'
export { FORM_ERROR } from 'app/core/components/Forms/Form'

export function SessionTypeForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
    </Form>
  )
}
