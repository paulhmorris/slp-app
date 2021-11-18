import AdminLayout from 'app/core/layouts/AdminLayout'
import { FORM_ERROR, PatientForm } from 'app/patients/components/forms/PatientSettings'
import updatePatient from 'app/patients/mutations/updatePatient'
import getPatient from 'app/patients/queries/getPatient'
import { BlitzPage, Head, Link, Routes, useMutation, useParam, useQuery, useRouter } from 'blitz'
import { Suspense } from 'react'

export const EditPatient = () => {
  const router = useRouter()
  const patientId = useParam('patientId', 'number')
  const [patient, { setQueryData }] = useQuery(
    getPatient,
    { id: patientId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updatePatientMutation] = useMutation(updatePatient)

  return (
    <>
      <Head>
        <title>Edit Patient {patient.id}</title>
      </Head>

      <div>
        <h1>Edit Patient {patient.id}</h1>
        {/* <pre>{JSON.stringify(patient, null, 2)}</pre> */}

        <PatientForm
          submitText="Update Patient"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdatePatient}
          initialValues={patient}
          onSubmit={async (values) => {
            try {
              const updated = await updatePatientMutation({
                id: patient.id,
                ...values,
              })
              // await setQueryData(updated)
              router.push(Routes.ShowPatientPage({ patientId: updated.id }))
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

const EditPatientPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPatient />
      </Suspense>

      <p>
        <Link href={Routes.PatientsPage()}>
          <a>Patients</a>
        </Link>
      </p>
    </div>
  )
}

EditPatientPage.authenticate = true
EditPatientPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default EditPatientPage
