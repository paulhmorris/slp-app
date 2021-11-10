import { Link, useRouter, useMutation, BlitzPage, Routes } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import createPatientService from 'app/patient-services/mutations/createPatientService'
import { PatientServiceForm, FORM_ERROR } from 'app/patient-services/components/PatientServiceForm'

const NewPatientServicePage: BlitzPage = () => {
  const router = useRouter()
  const [createPatientServiceMutation] = useMutation(createPatientService)

  return (
    <div>
      <h1>Create New PatientService</h1>

      <PatientServiceForm
        submitText="Create PatientService"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreatePatientService}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const patientService = await createPatientServiceMutation(values)
            router.push(Routes.ShowPatientServicePage({ patientServiceId: patientService.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.PatientServicesPage()}>
          <a>PatientServices</a>
        </Link>
      </p>
    </div>
  )
}

NewPatientServicePage.authenticate = true
NewPatientServicePage.getLayout = (page) => (
  <Layout title={'Create New PatientService'}>{page}</Layout>
)

export default NewPatientServicePage
