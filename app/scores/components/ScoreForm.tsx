import { Form, FormProps } from 'app/core/components/Forms/Form'
import { LabeledTextField } from 'app/core/components/Forms/LabeledTextField'
import { z } from 'zod'
export { FORM_ERROR } from 'app/core/components/Forms/Form'

export function ScoreForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField
        type="number"
        name="value"
        label="Score"
        placeholder="00"
        className="text-3xl text-center w-24 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
      />
    </Form>
  )
}
