import Layout from 'app/core/layouts/Layout'
import { PatientHeading } from 'app/patients/components/overview/PatientHeading'
import { PatientInfo } from 'app/patients/components/sidebar/PatientInfo'
import { PatientRelationList } from 'app/patients/components/sidebar/PatientRelationList'
import { UpcomingAppointments } from 'app/patients/components/sidebar/UpcomingAppointments'
import getPatient from 'app/patients/queries/getPatient'
import getUpcomingAppointments from 'app/patients/queries/getUpcomingAppointments'
import { BlitzPage, Head, Link, Routes, useParam, useQuery, useRouter } from 'blitz'
import { Suspense } from 'react'

export const Patient = ({ children }) => {
  const patientId = useParam('patientId', 'number')
  const router = useRouter()
  const [patient] = useQuery(getPatient, { id: patientId })
  const [upcomingAppointments] = useQuery(getUpcomingAppointments, { patientId: patient.id })

  const contact = patient.patientRelations[0]?.contact

  if (!contact) {
    throw new Error('No Contact entry found for this Patient')
  }

  return (
    <>
      <Head>
        <title>
          Details for {contact.firstName.substring(0, 1)}
          {contact.lastName.substring(0, 1)}
        </title>
      </Head>

      <PatientHeading
        patientId={patient.id}
        contact={contact}
        upcomingAppointments={upcomingAppointments}
      />

      <div className="grid gap-5 grid-cols-4">
        <div className="col-span-3 mt-4">
          <Link href={Routes.PatientOverviewPage({ patientId: patient.id })}>
            <button>Overview</button>
          </Link>
          {children}
        </div>

        <Sidebar>
          <PatientInfo contact={contact} />
          <PatientRelationList patientId={patient.id} />
          <UpcomingAppointments patientId={patient.id} />
        </Sidebar>
      </div>
    </>
  )
}

const Overview = () => {
  const router = useRouter()
  return router.pathname.includes('/deets') && <div>Overview</div>
}

const Sidebar = ({ children }) => {
  return (
    <aside className="flex flex-col col-span-1 w-full min-h-screen space-y-4">{children}</aside>
  )
}

const ShowPatientPage: BlitzPage = ({ children }) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Patient>{children}</Patient>
      </Suspense>
    </div>
  )
}

ShowPatientPage.authenticate = true
ShowPatientPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPatientPage
