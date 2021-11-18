import PatientLayout from 'app/core/layouts/PatientLayout'
import getPatient from 'app/patients/queries/getPatient'
import { BlitzPage, useParam, useQuery } from 'blitz'
import { Suspense } from 'react'

export const PatientRelationsDetails = () => {
  const patientId = useParam('patientId', 'number')
  const [patient] = useQuery(getPatient, { id: patientId })

  return (
    <>
      <div>
        <h3 className="bg-indigo-100 text-indigo-900 rounded-lg p-3 inline-block">
          {"I'm the Contacts Page"}
        </h3>
      </div>
    </>
  )
}

const PatientRelationsDetailsPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PatientRelationsDetails />
      </Suspense>
    </div>
  )
}

PatientRelationsDetailsPage.getLayout = (page) => <PatientLayout>{page}</PatientLayout>

export default PatientRelationsDetailsPage
