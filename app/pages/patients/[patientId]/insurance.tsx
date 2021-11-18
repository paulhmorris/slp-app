import PatientLayout from 'app/core/layouts/PatientLayout'
import getPatient from 'app/patients/queries/getPatient'
import { BlitzPage, useParam, useParams, useQuery } from 'blitz'
import { Suspense } from 'react'

export const PatientInsurance = () => {
  const params = useParams()
  const patientId = useParam('patientId', 'number')
  const [patient] = useQuery(getPatient, { id: patientId })

  return (
    <>
      <div>
        <h3 className="bg-indigo-100 text-indigo-900 rounded-lg p-3 inline-block">
          {"I'm the Insurance Page"}
        </h3>
      </div>
    </>
  )
}

const PatientInsurancePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PatientInsurance />
      </Suspense>
    </div>
  )
}

PatientInsurancePage.getLayout = (page) => <PatientLayout>{page}</PatientLayout>

export default PatientInsurancePage
