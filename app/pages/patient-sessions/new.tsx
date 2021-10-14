import { Link, useRouter, useMutation, BlitzPage, Routes, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import createPatientSession from "app/patient-sessions/mutations/createPatientSession"
import { PatientSessionForm, FORM_ERROR } from "app/patient-sessions/components/PatientSessionForm"
import getSessionTypes from "app/session-types/queries/getSessionTypes"

const NewPatientSessionPage: BlitzPage = () => {
  const router = useRouter()
  const [createPatientSessionMutation] = useMutation(createPatientSession)
  const [{ sessionTypes }] = useQuery(getSessionTypes, {
    orderBy: { id: "asc" },
  })

  return (
    <div>
      <h1>Start New Session</h1>
      {sessionTypes.map((type) => (
        <p key={type.id}>{type.name}</p>
      ))}

      <PatientSessionForm
        submitText="Create PatientSession"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreatePatientSession}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const patientSession = await createPatientSessionMutation(values)
            router.push(Routes.ShowPatientSessionPage({ patientSessionId: patientSession.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.PatientSessionsPage()}>
          <a>PatientSessions</a>
        </Link>
      </p>
    </div>
  )
}

NewPatientSessionPage.authenticate = true
NewPatientSessionPage.getLayout = (page) => (
  <Layout title={"Create New PatientSession"}>{page}</Layout>
)

export default NewPatientSessionPage
