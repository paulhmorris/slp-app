import { ToggleSwitch } from 'app/core/components/forms/ToggleSwitch'
import { Field } from 'react-final-form'

const ToggleAdapter = (props) => {
  const {
    input: { checked, value, name, onChange, ...restInput },
    meta,
    ...rest
  } = props

  return (
    <ToggleSwitch
      name={name}
      inputProps={restInput}
      onChange={onChange}
      checked={value}
      value={value}
      {...rest}
    />
  )
}

export const LabeledToggle = ({ name, ...rest }) => {
  return <Field name={name} {...rest} component={ToggleAdapter} />
}
