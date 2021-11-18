import getScores from 'app/scores/queries/getScores'
import { BlitzPage, Head, Link, Routes, usePaginatedQuery, useRouter } from 'blitz'
import { Suspense } from 'react'

const ITEMS_PER_PAGE = 100

export const ScoresList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ scores, hasMore }] = usePaginatedQuery(getScores, {
    orderBy: { id: 'asc' },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {scores.map((score) => (
          <li key={score.id}>
            <Link href={Routes.ShowScorePage({ scoreId: score.id })}>
              <a>{score.value}</a>
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

const ScoresPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Scores</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewScorePage()}>
            <a>Create Score</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ScoresList />
        </Suspense>
      </div>
    </>
  )
}

ScoresPage.authenticate = true
ScoresPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default ScoresPage
