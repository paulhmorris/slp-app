import { AppointmentForm, FORM_ERROR } from 'app/appointments/components/AppointmentForm'
import updateAppointment from 'app/appointments/mutations/updateAppointment'
import getAppointment from 'app/appointments/queries/getAppointment'
import AdminLayout from 'app/core/layouts/AdminLayout'
import { BlitzPage, Head, Routes, useMutation, useParam, useQuery, useRouter } from 'blitz'

export const EditAppointment = () => {
  const router = useRouter()
  const appointmentId = useParam('appointmentId', 'number')
  const [appointment, { setQueryData }] = useQuery(
    getAppointment,
    { id: appointmentId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateAppointmentMutation] = useMutation(updateAppointment)

  return (
    <>
      <Head>
        <title>Edit Appointment {appointment.id}</title>
      </Head>

      <div>
        <h1>Edit appointment {appointment.id}</h1>
        <pre>{JSON.stringify(appointment, null, 2)}</pre>

        <AppointmentForm
          submitText="Update appointment"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={Updateappointment}
          initialValues={appointment}
          onSubmit={async (values) => {
            try {
              // 2. after adding the notes field, you can pass it here
              const updated = await updateAppointmentMutation({
                id: appointment.id,
                ...values,
              })
              // await setQueryData(updated)
              router.push(Routes.ShowAppointmentPage({ appointmentId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditAppointmentPage: BlitzPage = () => {
  return (
    <div>
      <EditAppointment />
    </div>
  )
}

EditAppointmentPage.authenticate = true
EditAppointmentPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default EditAppointmentPage
