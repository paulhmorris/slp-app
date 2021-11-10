import { Suspense } from 'react'
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import getPatientService from 'app/patient-services/queries/getPatientService'
import updatePatientService from 'app/patient-services/mutations/updatePatientService'
import { PatientServiceForm, FORM_ERROR } from 'app/patient-services/components/PatientServiceForm'

export const EditPatientService = () => {
  const router = useRouter()
  const patientServiceId = useParam('patientServiceId', 'number')
  const [patientService, { setQueryData }] = useQuery(
    getPatientService,
    { id: patientServiceId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updatePatientServiceMutation] = useMutation(updatePatientService)

  return (
    <>
      <Head>
        <title>Edit PatientService {patientService.id}</title>
      </Head>

      <div>
        <h1>Edit PatientService {patientService.id}</h1>
        <pre>{JSON.stringify(patientService, null, 2)}</pre>

        <PatientServiceForm
          submitText="Update PatientService"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdatePatientService}
          initialValues={patientService}
          onSubmit={async (values) => {
            try {
              const updated = await updatePatientServiceMutation({
                id: patientService.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowPatientServicePage({ patientServiceId: updated.id }))
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

const EditPatientServicePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPatientService />
      </Suspense>

      <p>
        <Link href={Routes.PatientServicesPage()}>
          <a>PatientServices</a>
        </Link>
      </p>
    </div>
  )
}

EditPatientServicePage.authenticate = true
EditPatientServicePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPatientServicePage
