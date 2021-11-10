import { Suspense } from 'react'
import { Head, Link, useQuery, useParam, BlitzPage, Routes } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import getPatient from 'app/patients/queries/getPatient'
import { UpcomingAppointments } from 'app/patients/components/sidebar/UpcomingAppointments'
import { PatientContactList } from 'app/patients/components/sidebar/PatientContactList'

export const PatientOverview = () => {
  const patientId = useParam('patientId', 'number')
  const [patient] = useQuery(getPatient, { id: patientId })

  return (
    <>
      <Head>
        <title>Details for Patient {patient.id}</title>
      </Head>

      <div>
        <h1>Patient {patient.id}</h1>
        {/* <pre>{JSON.stringify(patient, null, 2)}</pre> */}

        <Link href={Routes.EditPatientPage({ patientId: patient.id })}>
          <a className="btn-primary mr-2">Edit</a>
        </Link>

        <Sidebar>
          <UpcomingAppointments patientId={patient.id} />
          <PatientContactList patientId={patient.id} />
        </Sidebar>
      </div>
    </>
  )
}

const Sidebar = ({ children }) => {
  return <aside className="flex flex-col w-min min-h-screen space-y-4">{children}</aside>
}

const PatientOverviewPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PatientOverview />
      </Suspense>
    </div>
  )
}

PatientOverviewPage.authenticate = true
PatientOverviewPage.getLayout = (page) => <Layout>{page}</Layout>

export default PatientOverviewPage
