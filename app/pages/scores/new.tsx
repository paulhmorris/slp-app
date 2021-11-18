import { FORM_ERROR, ScoreForm } from 'app/scores/components/ScoreForm'
import createScore from 'app/scores/mutations/createScore'
import { BlitzPage, Link, Routes, useMutation, useRouter } from 'blitz'

const NewScorePage: BlitzPage = () => {
  const router = useRouter()
  const [createScoreMutation] = useMutation(createScore)

  return (
    <div>
      <h1>Create New Score</h1>

      <ScoreForm
        submitText="Create Score"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateScore}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const score = await createScoreMutation(values)
            router.push(Routes.ShowScorePage({ scoreId: score.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.ScoresPage()}>
          <a>Scores</a>
        </Link>
      </p>
    </div>
  )
}

NewScorePage.authenticate = true
NewScorePage.getLayout = (page) => <AdminLayout title={'Create New Score'}>{page}</AdminLayout>

export default NewScorePage
