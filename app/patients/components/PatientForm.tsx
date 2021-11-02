import { Form, FormProps } from 'app/core/components/Form'
import { LabeledTextField } from 'app/core/components/LabeledTextField'
import dayjs from 'dayjs'
import { Field } from 'react-final-form'
import { z } from 'zod'
export { FORM_ERROR } from 'app/core/components/Form'

export function PatientForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  console.log()
  return (
    <Form<S> {...props}>
      <div className="mt-8">
        <div className="md:grid md:grid-cols-1 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
              <p className="mt-1 text-sm text-gray-600">
                Enter the contact information for the patient.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-2">
                    <LabeledTextField
                      type="text"
                      name="firstName"
                      label="First name"
                      placeholder="Jimmy"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <LabeledTextField
                      type="text"
                      name="lastName"
                      label="Last name"
                      placeholder="John"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <LabeledTextField
                      type="email"
                      name="email"
                      label="Email address"
                      placeholder="jimmy@john.com"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="dateOfBirth">Date of birth</label>
                    <div>
                      <Field
                        component="input"
                        type="date"
                        parse={(value) => new Date(value)}
                        format={(value) => value && value.valueAsDate}
                        name="dateOfBirth"
                        id="dateOfBirth"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="col-span-5">
                    <LabeledTextField
                      type="text"
                      name="address.street"
                      label="Street address"
                      placeholder="123 Main Ave"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <LabeledTextField
                      type="text"
                      name="address.city"
                      label="City"
                      placeholder="Richardson"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <LabeledTextField
                      type="text"
                      name="address.region"
                      label="State / Province"
                      placeholder="TX"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <LabeledTextField
                      type="text"
                      name="address.postcode"
                      label="ZIP / Postal code"
                      placeholder="75123"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <input type="text" name="address.country" className="sr-only" value="USA" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
}
