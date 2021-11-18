import PatientLayout from 'app/core/layouts/PatientLayout'
import getPatient from 'app/patients/queries/getPatient'
import getUpcomingAppointments from 'app/patients/queries/getUpcomingAppointments'
import { BlitzPage, useParam, useQuery, useRouter } from 'blitz'
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
      <div>This page reroutes to the Overview page</div>
    </>
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
ShowPatientPage.getLayout = (page) => <PatientLayout>{page}</PatientLayout>

export default ShowPatientPage
