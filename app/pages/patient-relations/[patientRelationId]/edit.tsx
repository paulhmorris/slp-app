import AdminLayout from 'app/core/layouts/AdminLayout'
import {
  FORM_ERROR,
  PatientRelationForm,
} from 'app/patient-contacts/components/PatientRelationForm'
import updatePatientRelation from 'app/patient-contacts/mutations/updatePatientRelation'
import getPatientRelation from 'app/patient-contacts/queries/getPatientRelation'
import { BlitzPage, Head, Link, Routes, useMutation, useParam, useQuery, useRouter } from 'blitz'
import { Suspense } from 'react'

export const EditPatientRelation = () => {
  const router = useRouter()
  const patientRelationId = useParam('patientRelationId', 'number')
  const [patientRelation, { setQueryData }] = useQuery(
    getPatientRelation,
    { id: patientRelationId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updatePatientRelationMutation] = useMutation(updatePatientRelation)

  return (
    <>
      <Head>
        <title>Edit PatientRelation {patientRelation.id}</title>
      </Head>

      <div>
        <h1>Edit PatientRelation {patientRelation.id}</h1>
        <pre>{JSON.stringify(patientRelation, null, 2)}</pre>

        <PatientRelationForm
          submitText="Update PatientRelation"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdatePatientRelation}
          initialValues={patientRelation}
          onSubmit={async (values) => {
            try {
              const updated = await updatePatientRelationMutation({
                id: patientRelation.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowPatientRelationPage({ patientRelationId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditPatientRelationPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPatientRelation />
      </Suspense>

      <p>
        <Link href={Routes.PatientRelationsPage()}>
          <a>PatientRelations</a>
        </Link>
      </p>
    </div>
  )
}

EditPatientRelationPage.authenticate = true
EditPatientRelationPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default EditPatientRelationPage
