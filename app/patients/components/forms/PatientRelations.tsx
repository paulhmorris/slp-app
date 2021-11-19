import { Form, FormProps } from 'app/core/components/forms/Form'
import { FormSection } from 'app/core/components/forms/FormSection'
import LabeledTextField from 'app/core/components/forms/LabeledTextField'
import { LabeledToggle } from 'app/core/components/forms/LabeledToggle'
import { z } from 'zod'
import { AddressFields } from './AddressFields'
import { NameFields } from './NameFields'
import { PhoneFields } from './PhoneFields'
export { FORM_ERROR } from 'app/core/components/forms/Form'

export function RelationForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const { initialValues } = props

  return (
    <Form<S> {...props}>
      <FormSection title="Status">
        <div className="col-span-6">
          <LabeledToggle
            name="isActive"
            label="Patient Status"
            description="Setting a patient's Status to Inactive removes them from your active Patient list, while safely preserving their documentation and history."
            activeText="Active"
            inactiveText="Inactive"
          />
        </div>
      </FormSection>
      <FormSection title="Name">
        <NameFields />
      </FormSection>

      <FormSection
        title="Email"
        description="If you want to send this client email reminders or billing documents, and to grant them Client Portal access, add their email address."
      >
        <LabeledTextField
          name="email"
          type="email"
          label="email address"
          placeholder="jimmy@john.com"
          span="col-span-2"
        />
      </FormSection>

      <FormSection title="Phone">
        <PhoneFields phones={initialValues?.phones} />
      </FormSection>

      <FormSection
        title="Address"
        description="Required for insurance billing—please use the patient’s address they have on file with their insurance provider."
      >
        <AddressFields />
      </FormSection>
    </Form>
  )
}
