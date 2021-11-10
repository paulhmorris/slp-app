import { Suspense } from 'react'
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import getPatientService from 'app/patient-services/queries/getPatientService'
import deletePatientService from 'app/patient-services/mutations/deletePatientService'

export const PatientService = () => {
  const router = useRouter()
  const patientServiceId = useParam('patientServiceId', 'number')
  const [deletePatientServiceMutation] = useMutation(deletePatientService)
  const [patientService] = useQuery(getPatientService, { id: patientServiceId })

  return (
    <>
      <Head>
        <title>PatientService {patientService.id}</title>
      </Head>

      <div>
        <h1>PatientService {patientService.id}</h1>
        <pre>{JSON.stringify(patientService, null, 2)}</pre>

        <Link href={Routes.EditPatientServicePage({ patientServiceId: patientService.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm('This will be deleted')) {
              await deletePatientServiceMutation({ id: patientService.id })
              router.push(Routes.PatientServicesPage())
            }
          }}
          style={{ marginLeft: '0.5rem' }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowPatientServicePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.PatientServicesPage()}>
          <a>PatientServices</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <PatientService />
      </Suspense>
    </div>
  )
}

ShowPatientServicePage.authenticate = true
ShowPatientServicePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPatientServicePage
