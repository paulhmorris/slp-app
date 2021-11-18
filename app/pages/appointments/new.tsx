import { AppointmentForm, FORM_ERROR } from 'app/appointments/components/AppointmentForm'
import createAppointment from 'app/appointments/mutations/createAppointment'
import { BlitzPage, Routes, useMutation, useRouter } from 'blitz'

const NewAppointmentPage: BlitzPage = () => {
  const router = useRouter()
  const [createAppointmentMutation] = useMutation(createAppointment)

  return (
    <div>
      <h1>Start new Session</h1>
      <AppointmentForm
        submitText="Start Session"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateAppointment}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const appointment = await createAppointmentMutation(values)
            router.push(Routes.ShowAppointmentPage({ appointmentId: appointment.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </div>
  )
}

NewAppointmentPage.authenticate = true
NewAppointmentPage.getLayout = (page) => (
  <AdminLayout title={'Start New Session'}>{page}</AdminLayout>
)

export default NewAppointmentPage
