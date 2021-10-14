import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPatientSession from "app/patient-sessions/queries/getPatientSession"
import deletePatientSession from "app/patient-sessions/mutations/deletePatientSession"

export const PatientSession = () => {
  const router = useRouter()
  const patientSessionId = useParam("patientSessionId", "number")
  const [deletePatientSessionMutation] = useMutation(deletePatientSession)
  const [patientSession] = useQuery(getPatientSession, { id: patientSessionId })

  return (
    <>
      <Head>
        <title>PatientSession {patientSession.id}</title>
      </Head>

      <div>
        <h1>PatientSession {patientSession.id}</h1>
        <pre>{JSON.stringify(patientSession, null, 2)}</pre>

        <Link href={Routes.EditPatientSessionPage({ patientSessionId: patientSession.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePatientSessionMutation({ id: patientSession.id })
              router.push(Routes.PatientSessionsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowPatientSessionPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.PatientSessionsPage()}>
          <a>PatientSessions</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <PatientSession />
      </Suspense>
    </div>
  )
}

ShowPatientSessionPage.authenticate = true
ShowPatientSessionPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPatientSessionPage
