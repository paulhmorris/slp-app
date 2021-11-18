import PatientLayout from 'app/core/layouts/PatientLayout'
import { BlitzPage, useParam } from 'blitz'
import { Suspense } from 'react'

export const PatientOverview = () => {
  const patientId = useParam('patientId', 'number')

  return (
    <>
      <div>
        <h3 className="bg-indigo-100 text-indigo-900 rounded-lg p-3 inline-block">
          I am the Overview
        </h3>
      </div>
    </>
  )
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

PatientOverviewPage.getLayout = (page) => <PatientLayout>{page}</PatientLayout>

export default PatientOverviewPage
