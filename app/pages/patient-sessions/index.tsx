import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPatientSessions from "app/patient-sessions/queries/getPatientSessions"

const ITEMS_PER_PAGE = 100

export const PatientSessionsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ patientSessions, hasMore }] = usePaginatedQuery(getPatientSessions, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {patientSessions.map((patientSession) => (
          <li key={patientSession.id}>
            <Link href={Routes.ShowPatientSessionPage({ patientSessionId: patientSession.id })}>
              <a>{patientSession.id}</a>
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

const PatientSessionsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>PatientSessions</title>
      </Head>

      <div>
        <h1>Sessions</h1>
        <p>
          <Link href={Routes.NewPatientSessionPage()}>
            <a className="btn-green">Start New Session</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PatientSessionsList />
        </Suspense>
      </div>
    </>
  )
}

PatientSessionsPage.authenticate = true
PatientSessionsPage.getLayout = (page) => <Layout>{page}</Layout>

export default PatientSessionsPage
