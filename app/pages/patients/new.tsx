import { useRouter, useMutation, BlitzPage, Routes } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import createPatient from 'app/patients/mutations/createPatient'
import { PatientForm, FORM_ERROR } from 'app/patients/components/PatientForm'
import { createPatientSchema } from '../../patients/validations'

const NewPatientPage: BlitzPage = () => {
  const router = useRouter()
  const [createPatientMutation] = useMutation(createPatient)

  return (
    <div className="max-w-screen-lg">
      <h1>Create New Patient</h1>

      <PatientForm
        submitText="Create Patient"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          dateOfBirth: new Date(),
          address: {
            street: '',
            city: '',
            region: '',
            postcode: '',
            country: 'USA',
          },
        }}
        schema={createPatientSchema}
        onSubmit={async (values) => {
          try {
            const patient = await createPatientMutation(values)
            router.push(Routes.ShowPatientPage({ patientId: patient.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </div>
  )
}

NewPatientPage.authenticate = true
NewPatientPage.getLayout = (page) => <Layout title={'Create New Patient'}>{page}</Layout>

export default NewPatientPage
