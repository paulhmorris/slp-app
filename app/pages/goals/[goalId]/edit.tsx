import AdminLayout from 'app/core/layouts/AdminLayout'
import { FORM_ERROR, GoalForm } from 'app/goals/components/GoalForm'
import updateGoal from 'app/goals/mutations/updateGoal'
import getGoal from 'app/goals/queries/getGoal'
import { BlitzPage, Head, Link, Routes, useMutation, useParam, useQuery, useRouter } from 'blitz'
import { Suspense } from 'react'

export const EditGoal = () => {
  const router = useRouter()
  const goalId = useParam('goalId', 'number')
  const [goal, { setQueryData }] = useQuery(
    getGoal,
    { id: goalId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateGoalMutation] = useMutation(updateGoal)

  return (
    <>
      <Head>
        <title>Edit Goal {goal.id}</title>
      </Head>

      <div>
        <h1>Edit Goal {goal.id}</h1>
        <pre>{JSON.stringify(goal, null, 2)}</pre>

        <GoalForm
          submitText="Update Goal"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateGoal}
          initialValues={goal}
          onSubmit={async (values) => {
            try {
              const updated = await updateGoalMutation({
                id: goal.id,
                ...values,
              })
              // This doesn't even work from the boilerplate?
              // await setQueryData(updated)
              router.push(Routes.ShowGoalPage({ goalId: updated.id }))
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

const EditGoalPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditGoal />
      </Suspense>

      <p>
        <Link href={Routes.GoalsPage()}>
          <a>Goals</a>
        </Link>
      </p>
    </div>
  )
}

EditGoalPage.authenticate = true
EditGoalPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default EditGoalPage
