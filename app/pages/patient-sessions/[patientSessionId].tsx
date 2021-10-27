import { Divider } from 'app/core/components/Divider'
import Layout from 'app/core/layouts/Layout'
import { SessionNotes } from 'app/notes/components/SessionNotes'
import { PatientActiveGoals } from 'app/patient-sessions/components/PatientActiveGoals'
import updatePatientSession from 'app/patient-sessions/mutations/updatePatientSession'
import getPatientSession from 'app/patient-sessions/queries/getPatientSession'
import { BlitzPage, Head, useMutation, useParam, useQuery, invalidateQuery } from 'blitz'
import toast from 'react-hot-toast'
import { Toast } from 'app/core/components/Toast'
import { SessionHeader } from 'app/patient-sessions/components/SessionHeader'

export const PatientSession = () => {
  const patientSessionId = useParam('patientSessionId', 'number')
  const [patientSession] = useQuery(getPatientSession, { id: patientSessionId })
  const [updateSessionMutation, { isLoading }] = useMutation(updatePatientSession, {
    onSuccess: async () => {
      console.dir(patientSession)
      await invalidateQuery(getPatientSession)
      toast.custom(
        (t) => (
          <Toast
            show={t.visible}
            type="success"
            title="Successfully updated!"
            message={`Your session ${
              patientSession.sessionStatusId === 2
                ? `has been marked complete.`
                : `is now in progress.`
            } `}
          />
        ),
        { duration: 3000 }
      )
    },
    onError: () => {
      toast.custom((t) => (
        <Toast
          show={t.visible}
          type="error"
          title="Whoops! Something went wrong"
          message="We couldn't update your session."
        />
      ))
    },
  })

  async function updateSessionStatus(status: number) {
    try {
      // @ts-ignore
      await updateSessionMutation({ id: patientSessionId, sessionStatusId: status })
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  return (
    <>
      <Head>
        <title>Session</title>
      </Head>

      <div className="mx-auto">
        <SessionHeader
          patient={patientSession.patient}
          session={patientSession}
          updateSession={updateSessionStatus}
          loading={isLoading}
        />
        <Divider padding="6" />

        <div className="flex-1 relative z-0 flex space-x-8">
          <div className="flex-1">
            <PatientActiveGoals />
          </div>
          <div className="flex flex-1 flex-col">
            <h2 className="mb-3">Notes</h2>
            <SessionNotes patientSessionId={patientSessionId} />
          </div>
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
