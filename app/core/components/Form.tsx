import { css } from '@emotion/react'
import { validateZodSchema } from 'blitz'
import { PropsWithoutRef, ReactNode } from 'react'
import { Form as FinalForm, FormProps as FinalFormProps } from 'react-final-form'
import { PulseLoader } from 'react-spinners'
import { z } from 'zod'
export { FORM_ERROR } from 'final-form'

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>['onSubmit']
  initialValues?: FinalFormProps<z.infer<S>>['initialValues']
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  const loader = css`
    position: absolute;
    top: 53%;
    left: 50%;
    transform: translate(-50%, -50%);
  `

  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchema(schema)}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          {children}

          {submitText && (
            <button
              type="submit"
              disabled={submitting}
              className={`btn-primary relative ${submitting && 'text-transparent'}`}
            >
              {submitting && (
                <PulseLoader css={loader} color="white" size={8} speedMultiplier={0.75} />
              )}
              {submitText}
            </button>
          )}

          {submitError && (
            <div role="alert" className="text-red-600">
              <pre>{submitError}</pre>
            </div>
          )}

          <style global jsx>{`
            .form > * + * {
              margin-top: 1rem;
            }
          `}</style>
        </form>
      )}
    />
  )
}

export default Form
