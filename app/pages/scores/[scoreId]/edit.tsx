import { FORM_ERROR, ScoreForm } from 'app/scores/components/ScoreForm'
import updateScore from 'app/scores/mutations/updateScore'
import getScore from 'app/scores/queries/getScore'
import { BlitzPage, Head, Link, Routes, useMutation, useParam, useQuery, useRouter } from 'blitz'
import { Suspense } from 'react'

export const EditScore = () => {
  const router = useRouter()
  const scoreId = useParam('scoreId', 'number')
  const [score, { setQueryData }] = useQuery(
    getScore,
    { id: scoreId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateScoreMutation] = useMutation(updateScore)

  return (
    <>
      <Head>
        <title>Edit Score {score.id}</title>
      </Head>

      <div>
        <h1>Edit Score {score.id}</h1>
        <pre>{JSON.stringify(score, null, 2)}</pre>

        <ScoreForm
          submitText="Update Score"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateScore}
          initialValues={score}
          onSubmit={async (values) => {
            try {
              const updated = await updateScoreMutation({
                id: score.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowScorePage({ scoreId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditScorePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditScore />
      </Suspense>

      <p>
        <Link href={Routes.ScoresPage()}>
          <a>Scores</a>
        </Link>
      </p>
    </div>
  )
}

EditScorePage.authenticate = true
EditScorePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default EditScorePage
