import Layout from 'app/core/layouts/Layout'
import {
  FORM_ERROR,
  PatientRelationForm,
} from 'app/patient-contacts/components/PatientRelationForm'
import createPatientRelation from 'app/patient-contacts/mutations/createPatientRelation'
import { BlitzPage, Link, Routes, useMutation, useRouter } from 'blitz'

const NewPatientRelationPage: BlitzPage = () => {
  const router = useRouter()
  const [createPatientRelationMutation] = useMutation(createPatientRelation)

  return (
    <div>
      <h1>Create New PatientRelation</h1>

      <PatientRelationForm
        submitText="Create PatientRelation"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreatePatientRelation}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const patientRelation = await createPatientRelationMutation(values)
            router.push(Routes.ShowPatientRelationPage({ patientRelationId: patientRelation.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.PatientRelationsPage()}>
          <a>PatientRelations</a>
        </Link>
      </p>
    </div>
  )
}

NewPatientRelationPage.authenticate = true
NewPatientRelationPage.getLayout = (page) => (
  <Layout title={'Create New PatientRelation'}>{page}</Layout>
)

export default NewPatientRelationPage
