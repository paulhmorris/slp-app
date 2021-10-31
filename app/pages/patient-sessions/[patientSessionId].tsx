import { Divider } from 'app/core/components/Divider'
import Layout from 'app/core/layouts/Layout'
import { PatientActiveGoals } from 'app/patient-sessions/components/PatientActiveGoals'
import updatePatientSession from 'app/patient-sessions/mutations/updatePatientSession'
import getPatientSession from 'app/patient-sessions/queries/getPatientSession'
import { BlitzPage, Head, useMutation, useParam, useQuery, invalidateQuery } from 'blitz'
import toast from 'react-hot-toast'
import { Toast } from 'app/core/components/Toast'
import { SessionHeader } from 'app/patient-sessions/components/SessionHeader'
import getGoals from 'app/goals/queries/getGoals'
import { useState } from 'react'

const handleUpdate = async ({ isSuccess, statusId }) => {
  await invalidateQuery(getPatientSession)
  toast.custom(
    (t) => (
      <Toast
        show={t.visible}
        type={isSuccess ? 'success' : 'error'}
        title={isSuccess ? 'Successfully updated!' : 'Whoops! Something went wrong'}
        message={
          isSuccess
            ? `Your session ${
                statusId === 2 ? `has been marked complete.` : `is now in progress.`
              } `
            : "We couldn't update your session"
        }
      />
    ),
    isSuccess && { duration: 3000 }
  )
}

export const PatientSession = () => {
  const patientSessionId = useParam('patientSessionId', 'number')
  const [patientSession] = useQuery(getPatientSession, { id: patientSessionId })
  const [{ goals }] = useQuery(getGoals, {
    where: { patientId: patientSession.patientId, goalStatusId: 1 },
    orderBy: { createdAt: 'desc' },
  })
  const [currentGoal, setCurrentGoal] = useState(goals[0])

  const [updateSessionMutation, { isLoading }] = useMutation(updatePatientSession, {
    onSuccess: () => {
      handleUpdate({ isSuccess: true, statusId: patientSession.sessionStatusId })
    },
    onError: () => {
      handleUpdate({ isSuccess: false, statusId: patientSession.sessionStatusId })
    },
  })

  const updateSessionStatus = async (status: number) => {
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

        <div className="flex flex-1 relative z-0 space-x-8">
          <PatientActiveGoals
            goals={goals}
            currentGoal={currentGoal}
            setGoal={setCurrentGoal}
            patientId={patientSession.patientId}
          />
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
