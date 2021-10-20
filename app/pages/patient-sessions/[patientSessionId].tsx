import { SessionTimer } from 'app/core/components/SessionTimer'
import Layout from 'app/core/layouts/Layout'
import { SessionNotes } from 'app/notes/components/SessionNotes'
import deletePatientSession from 'app/patient-sessions/mutations/deletePatientSession'
import getPatientSession from 'app/patient-sessions/queries/getPatientSession'
import { BlitzPage, Head, Link, Routes, useMutation, useParam, useQuery, useRouter } from 'blitz'

export const PatientSession = () => {
  const router = useRouter()
  const patientSessionId = useParam('patientSessionId', 'number')
  const [deletePatientSessionMutation] = useMutation(deletePatientSession)
  const [patientSession] = useQuery(getPatientSession, { id: patientSessionId })

  return (
    <>
      <Head>
        <title>Session</title>
      </Head>

      <div>
        <Link href={Routes.EditPatientSessionPage({ patientSessionId: patientSession.id })}>
          <a className="btn-white mr-2">Edit</a>
        </Link>

        <button
          type="button"
          className="btn-white"
          onClick={async () => {
            if (window.confirm('This will be deleted')) {
              await deletePatientSessionMutation({ id: patientSession.id })
              router.push(Routes.PatientSessionsPage())
            }
          }}
        >
          Delete
        </button>
        <div className="mt-12 mb-3">
          <SessionTimer />
        </div>
        <div className="flex flex-col max-w-3xl">
          <h2 className="my-3">Notes</h2>
          <SessionNotes patientSessionId={patientSessionId} />
        </div>
      </div>
    </>
  )
}

const ShowPatientSessionPage: BlitzPage = () => {
  return (
    <div>
      <PatientSession />
    </div>
  )
}

ShowPatientSessionPage.authenticate = true
ShowPatientSessionPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPatientSessionPage
