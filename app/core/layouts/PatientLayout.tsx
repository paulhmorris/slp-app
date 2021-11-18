import { PatientHeading } from 'app/patients/components/overview/PatientHeading'
import { PatientTabs } from 'app/patients/components/overview/PatientTabs'
import { PatientInfo } from 'app/patients/components/sidebar/PatientInfo'
import { PatientRelationList } from 'app/patients/components/sidebar/PatientRelationList'
import { UpcomingAppointments } from 'app/patients/components/sidebar/UpcomingAppointments'
import getPatient from 'app/patients/queries/getPatient'
import getUpcomingAppointments from 'app/patients/queries/getUpcomingAppointments'
import { BlitzLayout, Head, useParam, useQuery, useRouter } from 'blitz'
import React, { Suspense } from 'react'
import AdminLayout from './AdminLayout'

const PatientLayout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  const patientId = useParam('patientId', 'number')
  const router = useRouter()
  // staleTime: Infinity for all patient show page to keep fields from being overwritten
  const [patient] = useQuery(getPatient, { id: patientId }, { staleTime: Infinity })
  const [upcomingAppointments] = useQuery(getUpcomingAppointments, { patientId: patient.id })
  const contact = patient.patientRelations[0]?.contact

  if (!contact) {
    throw new Error('No Contact entry found for this Patient')
  }

  return (
    <AdminLayout>
      <Head>
        <title>
          {title ||
            `Details for ${contact.firstName.substring(0, 1)}
          ${contact.lastName.substring(0, 1)}`}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Suspense fallback={<div>Loading...</div>}>
        <PatientHeading
          patientId={patient.id}
          contact={contact}
          upcomingAppointments={upcomingAppointments}
        />
      </Suspense>

      <div className="grid gap-5 grid-cols-7">
        <div className="col-span-5 mt-4">
          <PatientTabs />
          {children}
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <Sidebar>
            <PatientInfo contact={contact} />
            <PatientRelationList patientId={patient.id} />
            <UpcomingAppointments patientId={patient.id} />
          </Sidebar>
        </Suspense>
      </div>
    </AdminLayout>
  )
}

const Sidebar = ({ children }) => {
  return <aside className="flex flex-col col-span-2 w-full min-h-full space-y-4">{children}</aside>
}

PatientLayout.authenticate = true

export default PatientLayout
