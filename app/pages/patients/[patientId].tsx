import { Suspense } from 'react'
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import getPatient from 'app/patients/queries/getPatient'
import deletePatient from 'app/patients/mutations/deletePatient'

export const Patient = () => {
  const router = useRouter()
  const patientId = useParam('patientId', 'number')
  const [deletePatientMutation] = useMutation(deletePatient)
  const [patient] = useQuery(getPatient, { id: patientId })

  return (
    <>
      <Head>
        <title>Patient {patient.id}</title>
      </Head>

      <div>
        <h1>Patient {patient.id}</h1>
        <pre>{JSON.stringify(patient, null, 2)}</pre>

        <Link href={Routes.EditPatientPage({ patientId: patient.id })}>
          <a className="btn-primary mr-2">Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm('This will be deleted')) {
              await deletePatientMutation({ id: patient.id })
              router.push(Routes.PatientsPage())
            }
          }}
          className="btn-white"
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowPatientPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Patient />
      </Suspense>
    </div>
  )
}

ShowPatientPage.authenticate = true
ShowPatientPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPatientPage
