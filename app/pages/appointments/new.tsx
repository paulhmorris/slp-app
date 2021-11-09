import { Link, useRouter, useMutation, BlitzPage, Routes, useQuery } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import createAppointment from 'app/appointments/mutations/createAppointment'
import { AppointmentForm, FORM_ERROR } from 'app/appointments/components/AppointmentForm'

const NewappointmentPage: BlitzPage = () => {
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

NewappointmentPage.authenticate = true
NewappointmentPage.getLayout = (page) => <Layout title={'Start New Session'}>{page}</Layout>

export default NewappointmentPage
