import { Goal, GoalCategory, GoalStatus } from 'db'
import { useMutation, useSession, useQuery, useRouter, Routes } from 'blitz'
import { FORM_ERROR, ScoreForm } from 'app/scores/components/ScoreForm'
import createScore from 'app/scores/mutations/createScore'
import { PlusIcon } from '@heroicons/react/solid'
import getScores from 'app/scores/queries/getScores'
import dayjs from 'dayjs'

type GoalToScoreProps = {
  goal:
    | (Goal & {
        parentGoal: Goal
        status: GoalStatus
        category: GoalCategory
      })
    | undefined
  patientId: number
}

export const GoalToScore = ({ goal, patientId }: GoalToScoreProps) => {
  const router = useRouter()
  const session = useSession()
  const [{ scores }] = useQuery(getScores, {
    where: { goalId: goal?.id },
    orderBy: { createdAt: 'desc' },
  })
  const [createScoreMutation] = useMutation(createScore, {
    onSuccess: () => {
      console.log('Created Score')
    },
  })

  return (
    <>
      {goal ? (
        <div className="container flex flex-col space-y-4 justify-center mx-auto py-8 pl-8 pr-12 bg-white rounded-md border border-gray-200">
          <div>
            <dl className="mt-2 border-b border-gray-200 divide-y divide-gray-200">
              <div className="py-3 flex items-center justify-between text-sm font-medium">
                <dt className="text-gray-500 whitespace-nowrap">Intervention Area</dt>
                <dd className="text-gray-600 text-right">{goal.category.name}</dd>
              </div>
              <div className="py-3 flex items-center justify-between text-sm font-medium">
                <dt className="text-gray-500 whitespace-nowrap">Long Term Goal</dt>
                <dd className="text-gray-600 text-right">{goal.parentGoal.title}</dd>
              </div>
              <div className="py-3 flex items-center justify-between text-sm font-medium">
                <dt className="text-gray-500 whitespace-nowrap">Last Score</dt>
                <dd className="text-gray-600 text-right">
                  {scores.length > 0
                    ? `${scores[0]?.value}% on ${dayjs(scores[0]?.updatedAt).format('M/D')}`
                    : 'Never scored'}
                </dd>
              </div>
              <div className="py-3 flex justify-between text-sm font-medium">
                <dt className="text-gray-500">Short Term Goal</dt>
                <dd className="text-gray-600 text-right">{goal.title}</dd>
              </div>
            </dl>
          </div>
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
          <h3 className="mt-2 text-sm font-medium text-gray-900">This patient has no goals</h3>
          <p className="mt-1 text-sm text-gray-500">Add a goal to record scores</p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => router.push(Routes.ShowPatientPage({ patientId }))}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Goal
            </button>
          </div>
        </div>
      )}
    </>
  )
}
