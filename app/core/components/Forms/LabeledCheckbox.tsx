import { ComponentPropsWithoutRef, forwardRef, PropsWithoutRef } from 'react'
import { useField, UseFieldConfig } from 'react-final-form'
import { classNames } from '../../lib/helpers'

export interface LabeledCheckboxProps extends PropsWithoutRef<JSX.IntrinsicElements['input']> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field width */
  span: 'col-span-1' | 'col-span-2' | 'col-span-3'
  /** Field description that appears below the input. */
  initialValue?: boolean | string
  description?: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>
  labelProps?: ComponentPropsWithoutRef<'label'>
  fieldProps?: UseFieldConfig<string>
}

export const LabeledCheckbox = forwardRef<HTMLInputElement, LabeledCheckboxProps>(
  (
    {
      name,
      label,
      initialValue,
      type = 'checkbox',
      description,
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
    } = useField(name, { type, initialValue, ...fieldProps })

    const normalizedError = Array.isArray(error) ? error.join(', ') : error || submitError
    const ariaLabel = label.replace(/\s+/g, '-').toLowerCase()

    return (
      <div {...outerProps} className={`inline-flex items-start ${span}`}>
        <div className="flex items-center h-5">
          <input
            {...input}
            {...props}
            id={name}
            aria-describedby={`${description ? ariaLabel + '-description' : ''}`}
            disabled={submitting}
            ref={ref}
            value={String(input.checked)}
            className={classNames(
              touched && normalizedError
                ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:border-indigo-500',
              'rounded w-4 h-4 transition-colors duration-75 focus:outline-none'
            )}
          />
          <div className="ml-3 text-sm">
            <label htmlFor={name} className="font-medium text-gray-700" {...labelProps}>
              {label}
            </label>
            {touched && normalizedError ? (
              <div role="alert" className="mt-2 text-sm text-red-600">
                {normalizedError}
              </div>
            ) : (
              description && (
                <p
                  className="mt-2 text-sm text-gray-500 whitespace-nowrap"
                  id={`${ariaLabel + '-description'}`}
                >
                  {description}
                </p>
              )
            )}
          </div>
        </div>
      </div>
    )
  }
)

export default LabeledCheckbox
