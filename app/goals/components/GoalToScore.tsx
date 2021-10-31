import { Goal, GoalCategory, GoalStatus } from 'db'
import { useMutation, useSession } from 'blitz'
import { FORM_ERROR, ScoreForm } from 'app/scores/components/ScoreForm'
import createScore from 'app/scores/mutations/createScore'
interface GoalToScoreProps {
  goal:
    | (Goal & {
        parentGoal: Goal
        status: GoalStatus
        category: GoalCategory
      })
    | undefined
  patientId: number
}

export const GoalToScore = ({ goal }: GoalToScoreProps) => {
  const session = useSession()
  const [createScoreMutation] = useMutation(createScore, {
    onSuccess: () => {
      console.log('Created Score')
    },
  })

  return (
    <>
      {goal ? (
        <div className="container flex flex-col space-y-4 justify-center mx-auto py-8 pl-8 pr-12 bg-white rounded-md border border-gray-200">
          <p className="text-sm">Parent: {goal.parentGoal.title}</p>
          <p className="text-sm">Category: {goal.category.name}</p>
          <ScoreForm
            submitText="Add Score"
            onSubmit={async ({ score }) => {
              try {
                await createScoreMutation({
                  value: score,
                  goalId: goal?.id,
                  // Why is userId possible undefined?
                  // @ts-ignore
                  createdBy: session.userId,
                })
              } catch (error: any) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </div>
      ) : (
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No goal selected</h3>
          <p className="mt-1 text-sm text-gray-500">Select a goal from the goal tree</p>
        </div>
      )}
    </>
  )
}
