import LabeledCheckbox from 'app/core/components/Forms/LabeledCheckbox'
import LabeledTextField, { LabeledTextFieldProps } from 'app/core/components/Forms/LabeledTextField'

const nameFields: LabeledTextFieldProps[] = [
  {
    name: 'firstName',
    label: 'first name',
    placeholder: 'Lirst name',
    span: 'col-span-1',
    required: true,
  },
  {
    name: 'lastName',
    label: 'last name',
    placeholder: 'Last name',
    span: 'col-span-1',
    required: true,
  },
  {
    name: 'email',
    label: 'email address',
    placeholder: 'jimmy@john.com',
    span: 'col-span-2',
    required: true,
  },
  {
    name: 'preferredName',
    label: 'preferred name',
    placeholder: 'Preferred name',
    span: 'col-span-2',
    required: false,
    description:
      'Used in place of first name in client communication (reminders, billing documents, etc.)',
  },
]

export const NameFields = () => {
  return (
    <>
      {nameFields.map(({ name, label, placeholder, description, span, required }, fieldIdx) => (
        <LabeledTextField
          key={fieldIdx}
          span={span}
          name={name}
          label={label}
          placeholder={placeholder}
          type="text"
          required={required}
          description={description}
        />
      ))}
      <LabeledCheckbox name="isMinor" label="Client is a minor" span="col-span-3" />
    </>
  )
}
