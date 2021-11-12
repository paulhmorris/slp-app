import Layout from 'app/core/layouts/Layout'
import getPatient from 'app/patients/queries/getPatient'
import { BlitzPage, Link, Routes, useParam, useQuery } from 'blitz'
import { Suspense } from 'react'
import { Patient } from '../[patientId]'

export const PatientOverview = () => {
  const patientId = useParam('patientId', 'number')
  const [patient] = useQuery(getPatient, { id: patientId })

  return (
    <>
      <div>
        <h1>Patient {patient.id}</h1>
        {/* <pre>{JSON.stringify(patient, null, 2)}</pre> */}

        <Link href={Routes.EditPatientPage({ patientId: patient.id })}>
          <a className="btn-primary mr-2">Edit</a>
        </Link>
      </div>
    </>
  )
}

const PatientOverviewPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Patient>
          <PatientOverview />
        </Patient>
      </Suspense>
    </div>
  )
}

PatientOverviewPage.authenticate = true
PatientOverviewPage.getLayout = (page) => <Layout>{page}</Layout>

export default PatientOverviewPage
