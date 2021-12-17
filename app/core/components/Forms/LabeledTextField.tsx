import { ExclamationCircleIcon } from '@heroicons/react/solid'
import dayjs from 'dayjs'
import { ComponentPropsWithoutRef, forwardRef, PropsWithoutRef } from 'react'
import { useField, UseFieldConfig } from 'react-final-form'
import { classNames } from '../../lib/helpers'

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements['input']> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field description that appears below the input. */
  description?: string
  /** Field width */
  span?: 'col-span-1' | 'col-span-2' | 'col-span-3'
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: 'text' | 'password' | 'email' | 'number' | 'date'
  /** Formats the input as a phone number */
  isPhoneNumber?: boolean
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>
  labelProps?: ComponentPropsWithoutRef<'label'>
  fieldProps?: UseFieldConfig<string>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  (
    { name, label, description, span, isPhoneNumber, outerProps, fieldProps, labelProps, ...props },
    ref
  ) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse:
        props.type === 'number'
          ? (Number as any)
          : props.type === 'date'
          ? (v) => dayjs(v)
          : (v) => (v === '' ? null : v),
      format: props.type === 'date' ? (v) => dayjs(v).format('YYYY-MM-DD') : undefined,
      ...fieldProps,
    })

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
          <input
            id={name}
            {...input}
            {...props}
            aria-describedby={`${ariaLabel + '-optional'} ${
              description ? ariaLabel + '-description' : ''
            }`}
            disabled={submitting}
            ref={ref}
            className={classNames(
              touched && normalizedError
                ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
              'block text-base sm:text-sm rounded-md w-full focus:outline-none transition-colors',
              props.type !== 'date' && 'pr-10'
            )}
          />
          {touched && normalizedError && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon className="h-4 w-4 text-red-500" aria-hidden="true" />
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

export default LabeledTextField
