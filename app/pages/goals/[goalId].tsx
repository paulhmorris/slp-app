import AdminLayout from 'app/core/layouts/AdminLayout'
import deleteGoal from 'app/goals/mutations/deleteGoal'
import getGoal from 'app/goals/queries/getGoal'
import { BlitzPage, Head, Link, Routes, useMutation, useParam, useQuery, useRouter } from 'blitz'
import { Suspense } from 'react'

export const Goal = () => {
  const router = useRouter()
  const goalId = useParam('goalId', 'number')
  const [deleteGoalMutation] = useMutation(deleteGoal)
  const [goal] = useQuery(getGoal, { id: goalId })

  return (
    <>
      <Head>
        <title>Goal {goal.id}</title>
      </Head>

      <div>
        <h1>Goal {goal.id}</h1>
        <pre>{JSON.stringify(goal, null, 2)}</pre>

        <Link href={Routes.EditGoalPage({ goalId: goal.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm('This will be deleted')) {
              await deleteGoalMutation({ id: goal.id })
              router.push(Routes.GoalsPage())
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

const ShowGoalPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.GoalsPage()}>
          <a>Goals</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Goal />
      </Suspense>
    </div>
  )
}

ShowGoalPage.authenticate = true
ShowGoalPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default ShowGoalPage
