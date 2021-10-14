import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSessionTypes from "app/session-types/queries/getSessionTypes"

const ITEMS_PER_PAGE = 100

export const SessionTypesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ sessionTypes, hasMore }] = usePaginatedQuery(getSessionTypes, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {sessionTypes.map((sessionType) => (
          <li key={sessionType.id}>
            <Link href={Routes.ShowSessionTypePage({ sessionTypeId: sessionType.id })}>
              <a>{sessionType.name}</a>
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

const SessionTypesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>SessionTypes</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewSessionTypePage()}>
            <a>Create SessionType</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <SessionTypesList />
        </Suspense>
      </div>
    </>
  )
}

SessionTypesPage.authenticate = true
SessionTypesPage.getLayout = (page) => <Layout>{page}</Layout>

export default SessionTypesPage
