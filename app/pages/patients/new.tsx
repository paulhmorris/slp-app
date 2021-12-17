import AdminLayout from 'app/core/layouts/AdminLayout'
import { FORM_ERROR, PatientForm } from 'app/patients/components/forms/PatientSettings'
import createPatient from 'app/patients/mutations/createPatient'
import { BlitzPage, Routes, useMutation, useRouter } from 'blitz'
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
          // @ts-ignore how can I add properties to this type?
          isActive: true,
          dateOfBirth: new Date(),
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
NewPatientPage.getLayout = (page) => <AdminLayout title={'Create New Patient'}>{page}</AdminLayout>

export default NewPatientPage
