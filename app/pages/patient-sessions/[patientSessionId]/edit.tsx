import Layout from 'app/core/layouts/Layout'
import { FORM_ERROR, PatientSessionForm } from 'app/patient-sessions/components/PatientSessionForm'
import updatePatientSession from 'app/patient-sessions/mutations/updatePatientSession'
import getPatientSession from 'app/patient-sessions/queries/getPatientSession'
import { BlitzPage, Head, Routes, useMutation, useParam, useQuery, useRouter } from 'blitz'

export const EditPatientSession = () => {
  const router = useRouter()
  const patientSessionId = useParam('patientSessionId', 'number')
  const [patientSession, { setQueryData }] = useQuery(
    getPatientSession,
    { id: patientSessionId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updatePatientSessionMutation] = useMutation(updatePatientSession)

  return (
    <>
      <Head>
        <title>Edit PatientSession {patientSession.id}</title>
      </Head>

      <div>
        <h1>Edit PatientSession {patientSession.id}</h1>
        <pre>{JSON.stringify(patientSession, null, 2)}</pre>

        <PatientSessionForm
          submitText="Update PatientSession"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdatePatientSession}
          initialValues={patientSession}
          onSubmit={async (values) => {
            try {
              // 2. after adding the notes field, you can pass it here
              const updated = await updatePatientSessionMutation({
                id: patientSession.id,
                ...values,
              })
              // await setQueryData(updated)
              router.push(Routes.ShowPatientSessionPage({ patientSessionId: updated.id }))
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

const EditPatientSessionPage: BlitzPage = () => {
  return (
    <div>
      <EditPatientSession />
    </div>
  )
}

EditPatientSessionPage.authenticate = true
EditPatientSessionPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPatientSessionPage
