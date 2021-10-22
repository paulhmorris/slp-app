import { Divider } from 'app/core/components/Divider'
import Layout from 'app/core/layouts/Layout'
import { SessionNotes } from 'app/notes/components/SessionNotes'
import { PatientActiveGoals } from 'app/patient-sessions/components/PatientGoals'
import { SessionHeader } from 'app/patient-sessions/components/SessionHeader'
import deletePatientSession from 'app/patient-sessions/mutations/deletePatientSession'
import getPatientSession from 'app/patient-sessions/queries/getPatientSession'
import { BlitzPage, Head, useMutation, useParam, useQuery, useRouter } from 'blitz'

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

      {/* Primary Layout Div */}
      <div className="max-w-5xl mx-auto">
        <SessionHeader patient={patientSession.patient} session={patientSession} />
        {/*
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
        </button> */}
        Status: {patientSession.status.name}
        <Divider padding="10" />
        <PatientActiveGoals />
        <div className="flex flex-col">
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
