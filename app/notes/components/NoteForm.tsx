import { Form, FormProps } from 'app/core/components/Form'
import { Field } from 'react-final-form'
import { z } from 'zod'
export { FORM_ERROR } from 'app/core/components/Form'

export function NoteForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <Field name="body" component="textarea" className="" defaultValue={''} />
    </Form>
  )
}
