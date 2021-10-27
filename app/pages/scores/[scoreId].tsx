import { Suspense } from 'react'
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import getScore from 'app/scores/queries/getScore'
import deleteScore from 'app/scores/mutations/deleteScore'

export const Score = () => {
  const router = useRouter()
  const scoreId = useParam('scoreId', 'number')
  const [deleteScoreMutation] = useMutation(deleteScore)
  const [score] = useQuery(getScore, { id: scoreId })

  return (
    <>
      <Head>
        <title>Score {score.id}</title>
      </Head>

      <div>
        <h1>Score {score.id}</h1>
        <pre>{JSON.stringify(score, null, 2)}</pre>

        <Link href={Routes.EditScorePage({ scoreId: score.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm('This will be deleted')) {
              await deleteScoreMutation({ id: score.id })
              router.push(Routes.ScoresPage())
            }
          }}
          style={{ marginLeft: '0.5rem' }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowScorePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ScoresPage()}>
          <a>Scores</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Score />
      </Suspense>
    </div>
  )
}

ShowScorePage.authenticate = true
ShowScorePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowScorePage
