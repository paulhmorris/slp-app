import AdminLayout from 'app/core/layouts/AdminLayout'
import getPatientRelations from 'app/patient-contacts/queries/getPatientRelations'
import { BlitzPage, Head, Link, Routes, usePaginatedQuery, useRouter } from 'blitz'
import { Suspense } from 'react'

const ITEMS_PER_PAGE = 100

export const PatientRelationsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [patientRelations, hasMore] = usePaginatedQuery(getPatientRelations, {
    orderBy: { id: 'asc' },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {patientRelations.map((patientRelation) => (
          <li key={patientRelation.id}>
            <Link href={Routes.ShowPatientRelationPage({ patientRelationId: patientRelation.id })}>
              <a>
                {patientRelation.contact?.firstName} {patientRelation.contact?.lastName}
              </a>
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

const PatientRelationsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>PatientRelations</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewPatientRelationPage()}>
            <a>Create PatientRelation</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PatientRelationsList />
        </Suspense>
      </div>
    </>
  )
}

PatientRelationsPage.authenticate = true
PatientRelationsPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default PatientRelationsPage
