import Layout from 'app/core/layouts/Layout'
import { SessionNotes } from 'app/notes/components/SessionNotes'
import getNotes from 'app/notes/queries/getNotes'
import deletePatientSession from 'app/patient-sessions/mutations/deletePatientSession'
import getPatientSession from 'app/patient-sessions/queries/getPatientSession'
import { BlitzPage, Head, Link, Routes, useMutation, useParam, useQuery, useRouter } from 'blitz'

export const PatientSession = () => {
  const router = useRouter()
  const patientSessionId = useParam('patientSessionId', 'number')
  const [deletePatientSessionMutation] = useMutation(deletePatientSession)
  const [patientSession] = useQuery(getPatientSession, { id: patientSessionId })
  const [sessionNotes] = useQuery(getNotes, {
    where: { patientSessionId },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <>
      <Head>
        <title>Session {patientSession.id}</title>
      </Head>

      <div>
        {/* <h1>Session {patientSession.id}</h1> */}
        {/* <pre>{JSON.stringify(patientSession, null, 2)}</pre> */}

        <Link href={Routes.EditPatientSessionPage({ patientSessionId: patientSession.id })}>
          <a className="btn-primary mr-2">Edit</a>
        </Link>

        <button
          type="button"
          className="btn-secondary"
          onClick={async () => {
            if (window.confirm('This will be deleted')) {
              await deletePatientSessionMutation({ id: patientSession.id })
              router.push(Routes.PatientSessionsPage())
            }
          }}
        >
          Delete
        </button>

        <SessionNotes patientSessionId={patientSessionId} />
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
