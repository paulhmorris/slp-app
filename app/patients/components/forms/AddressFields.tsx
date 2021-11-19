import { LabeledTextField, LabeledTextFieldProps } from 'app/core/components/forms/LabeledTextField'

const addressFields: LabeledTextFieldProps[] = [
  {
    name: 'street',
    label: 'Street',
    placeholder: '123 Maine Ave',
    span: 'col-span-2',
  },
  {
    name: 'street2',
    label: 'Street 2',
    placeholder: 'Apt #7',
    span: 'col-span-1',
    required: false,
  },
  {
    name: 'city',
    label: 'city',
    placeholder: 'Coolville',
    span: 'col-span-1',
  },
  {
    name: 'region',
    label: 'state / province',
    placeholder: 'TX',
    span: 'col-span-1',
  },
  {
    name: 'postcode',
    label: 'ZIP / postal code',
    placeholder: '75123',
    span: 'col-span-1',
  },
]

export const AddressFields = () => {
  return (
    <>
      {addressFields.map(({ name, label, placeholder, required, span }, fieldIdx) => (
        <LabeledTextField
          key={fieldIdx}
          span={span}
          type="text"
          name={`address.${name}`}
          label={label}
          placeholder={placeholder}
          required={required === false ? false : true}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      ))}
      <input
        type="text"
        name="address.country"
        aria-label="country"
        value="USA"
        className="sr-only"
      />
    </>
  )
}
