import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { ComponentPropsWithoutRef, forwardRef, PropsWithoutRef } from 'react'
import { useField, UseFieldConfig } from 'react-final-form'
import { classNames } from '../../lib/helpers'

export interface LabeledSelectProps extends PropsWithoutRef<JSX.IntrinsicElements['select']> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Options to pass into the select */
  options: {
    value?: any
    text?: string
  }[]
  initialValue?: string
  /** Field description that appears below the input. */
  description?: string
  /** Field width */
  span?: 'col-span-1' | 'col-span-2' | 'col-span-3'
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>
  labelProps?: ComponentPropsWithoutRef<'label'>
  fieldProps?: UseFieldConfig<string>
}

export const LabeledSelect = forwardRef<HTMLSelectElement, LabeledSelectProps>(
  (
    {
      name,
      initialValue,
      label,
      description,
      options,
      span,
      outerProps,
      fieldProps,
      labelProps,
      ...props
    },
    ref
  ) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, { initialValue, ...fieldProps })

    const normalizedError = Array.isArray(error) ? error.join(', ') : error || submitError
    const ariaLabel = label.replace(/\s+/g, '-').toLowerCase()

    return (
      <div {...outerProps} className={span}>
        <div className="flex justify-between">
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 capitalize"
            {...labelProps}
          >
            {label}
          </label>
          {!props.required && (
            <span className="text-sm text-gray-500" id={`${ariaLabel}-optional`}>
              Optional
            </span>
          )}
        </div>
        <div className="mt-1 relative rounded-md">
          <select
            {...input}
            {...props}
            id={name}
            name={name}
            aria-describedby={`${ariaLabel + '-optional'} ${
              description ? ariaLabel + '-description' : ''
            }`}
            disabled={submitting}
            ref={ref}
            className={classNames(
              touched && normalizedError
                ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
              'block sm:text-sm rounded-md w-full focus:outline-none transition-colors capitalize'
            )}
          >
            {options.map(({ value, text }) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))}
          </select>
          {touched && normalizedError && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
          )}
        </div>

        {touched && normalizedError ? (
          <div role="alert" className="mt-2 text-sm text-red-600">
            {normalizedError}
          </div>
        ) : (
          description && (
            <p className="mt-2 text-sm text-gray-500" id={`${ariaLabel + '-description'}`}>
              {description}
            </p>
          )
        )}
      </div>
    )
  }
)

export default LabeledSelect
