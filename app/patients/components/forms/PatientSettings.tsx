import { Form, FormProps } from 'app/core/components/Forms/Form'
import { z } from 'zod'
import { AddressFields } from './AddressFields'
import { NameFields } from './NameFields'
import { PhoneFields } from './PhoneFields'
export { FORM_ERROR } from 'app/core/components/Forms/Form'

export function PatientForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const { initialValues } = props

  return (
    <Form<S> {...props}>
      <FormSection title="Name">
        <NameFields />
      </FormSection>

      <FormSection title="Phone">
        <PhoneFields phones={initialValues?.phones} />
      </FormSection>

      <FormSection title="Address">
        <AddressFields />
      </FormSection>

      <FormSection title="About Patient">
        <AddressFields />
      </FormSection>
    </Form>
  )
}

const FormSection = ({ title, children }) => {
  return (
    <>
      <div className="md:col-span-1 mt-4">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
        </div>
      </div>
      <div className="md:mt-0 md:col-span-2">
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-3 gap-5 max-w-xl">{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}
