import { PatientActiveGoals } from 'app/appointments/components/PatientActiveGoals'
import { SessionHeader } from 'app/appointments/components/SessionHeader'
import updateAppointment from 'app/appointments/mutations/updateAppointment'
import getAppointment from 'app/appointments/queries/getAppointment'
import { Divider } from 'app/core/components/Divider'
import EmptyState from 'app/core/components/EmptyState'
import { Toast } from 'app/core/components/Toast'
import getGoals from 'app/goals/queries/getGoals'
import { SessionNotes } from 'app/notes/components/SessionNotes'
import { BlitzPage, Head, invalidateQuery, useMutation, useParam, useQuery } from 'blitz'
import { Goal } from 'db'
import { Suspense, useState } from 'react'
import toast from 'react-hot-toast'

const handleUpdate = async ({ isSuccess }) => {
  await invalidateQuery(getAppointment)
  toast.custom(
    (t) => (
      <Toast
        show={t.visible}
        type={isSuccess ? 'success' : 'error'}
        title={isSuccess ? 'Successfully updated!' : 'Whoops! Something went wrong'}
        // message={
        //   isSuccess
        //     ? `Your session ${
        //         statusId === 2 ? `has been marked complete.` : `is now in progress.`
        //       } `
        //     : "We couldn't update your session"
        // }
      />
    ),
    isSuccess && { duration: 3000 }
  )
}

export const Appointment = () => {
  const appointmentId = useParam('appointmentId', 'number')
  const [appointment] = useQuery(getAppointment, { id: appointmentId })
  const [{ goals }] = useQuery(getGoals, {
    where: { patientId: appointment.patientId, goalStatusId: 1 },
    orderBy: { createdAt: 'desc' },
  })

  const [currentGoal, setCurrentGoal]: [Goal | undefined, any] = useState(undefined)

  const [updateSessionMutation, { isLoading }] = useMutation(updateAppointment, {
    onSuccess: () => {
      handleUpdate({ isSuccess: true })
    },
    onError: () => {
      handleUpdate({ isSuccess: false })
    },
  })

  const updateSessionStatus = async (status: number) => {
    try {
      // @ts-ignore
      await updateSessionMutation({ id: appointmentId, sessionStatusId: status })
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
          patient={appointment.patient}
          appointment={appointment}
          updateSession={updateSessionStatus}
          loading={isLoading}
        />
        <Divider padding="6" />

        <div className="flex-1 relative z-0 space-x-8">
          {/* TODO: figure out appointment statuses */}
          {appointment.endedAt ? (
            <Suspense fallback={<div>Loading...</div>}>
              <PatientActiveGoals
                goals={goals}
                currentGoal={currentGoal}
                setGoal={setCurrentGoal}
              />
            </Suspense>
          ) : (
            <EmptyState message="This session has already been submitted to insurance and only an admin can make changes." />
          )}
        </div>
      </div>
      {/* @ts-ignore */}
      {currentGoal && <SessionNotes goalId={currentGoal.id} />}
    </>
  )
}

const ShowAppointmentPage: BlitzPage = () => {
  return (
    <div>
      <Appointment />
    </div>
  )
}

ShowAppointmentPage.authenticate = true
ShowAppointmentPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default ShowAppointmentPage
