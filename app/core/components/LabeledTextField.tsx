import { ComponentPropsWithoutRef, forwardRef, PropsWithoutRef } from 'react'
import { useField, UseFieldConfig } from 'react-final-form'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { classNames } from '../lib/helpers'

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements['input']> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: 'text' | 'password' | 'email' | 'number'
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>
  labelProps?: ComponentPropsWithoutRef<'label'>
  fieldProps?: UseFieldConfig<string>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse:
        props.type === 'number'
          ? (Number as any)
          : // Converting `""` to `null` ensures empty values will be set to null in the DB
            (v) => (v === '' ? null : v),
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(', ') : error || submitError

    return (
      <div {...outerProps}>
        <label className="block text-sm font-medium text-gray-700" {...labelProps}>
          {label}
          <div className="mt-1 relative">
            <input
              {...input}
              disabled={submitting}
              {...props}
              ref={ref}
              // Why does this override className in the instance?
              // className={classNames(
              //   touched && normalizedError
              //     ? 'border-red-300 text-red-900 focus:outline-none focus:ring-red-500 focus:border-red-500'
              //     : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
              //   'shadow-sm block pr-10 sm:text-sm rounded-md'
              // )}
            />
            {touched && normalizedError && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
            )}
          </div>
        </label>

        {touched && normalizedError && (
          <div role="alert" className="mt-2 text-sm text-red-600">
            {normalizedError}
          </div>
        )}
      </div>
    )
  }
)

export default LabeledTextField
