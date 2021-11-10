import { Suspense } from 'react'
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import getPatientServices from 'app/patient-services/queries/getPatientServices'

const ITEMS_PER_PAGE = 100

export const PatientServicesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ patientServices, hasMore }] = usePaginatedQuery(getPatientServices, {
    orderBy: { id: 'asc' },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {patientServices.map((patientService) => (
          <li key={patientService.id}>
            <Link href={Routes.ShowPatientServicePage({ patientServiceId: patientService.id })}>
              <a>{patientService.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const PatientServicesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>PatientServices</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewPatientServicePage()}>
            <a>Create PatientService</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PatientServicesList />
        </Suspense>
      </div>
    </>
  )
}

PatientServicesPage.authenticate = true
PatientServicesPage.getLayout = (page) => <Layout>{page}</Layout>

export default PatientServicesPage
