import { Goal, GoalCategory, GoalStatus } from 'db'
import { useMutation, useSession, invalidateQuery } from 'blitz'
import { Form } from 'app/core/components/Form'
import { FORM_ERROR, ScoreForm } from 'app/scores/components/ScoreForm'
import createScore from 'app/scores/mutations/createScore'
import { createScoreSchema } from 'app/scores/validations'
import { ChevronDoubleLeftIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { PlusSmIcon, MinusSmIcon } from '@heroicons/react/solid'
import LabeledTextField from 'app/core/components/LabeledTextField'
import toast from 'react-hot-toast'
import { Toast } from 'app/core/components/Toast'
import { Timer } from 'app/scores/components/Timer'
import getScores from 'app/scores/queries/getScores'

const handleUpdate = async ({ isSuccess }) => {
  toast.custom(
    (t) => (
      <Toast
        show={t.visible}
        type={isSuccess ? 'success' : 'error'}
        title={isSuccess ? 'Success!' : 'Whoops! Something went wrong'}
        message={isSuccess ? 'Your score has been saved.' : "We couldn't update your session"}
      />
    ),
    isSuccess && { duration: 3000 }
  )
}
interface GoalToScoreProps {
  goal:
    | (Goal & {
        parentGoal: Goal | null
        status: GoalStatus
        category: GoalCategory
      })
    | undefined
  patientId: number
}

export const GoalToScore = ({ goal }: GoalToScoreProps) => {
  const session = useSession()
  const [createScoreMutation] = useMutation(createScore, {
    onSuccess: async () => {
      handleUpdate({ isSuccess: true })
      await invalidateQuery(getScores)
    },
    onError: async () => {
      handleUpdate({ isSuccess: false })
    },
  })

  return (
    <>
      {goal ? (
        <div className="container flex flex-col items-center space-y-4 justify-center mx-auto py-8 pl-8 pr-12 bg-white rounded-md border border-gray-200">
          {goal.scoreTypeId === 1 ? (
            <PercentageGoal
              goal={goal}
              scoreMutation={createScoreMutation}
              userId={session.userId}
            />
          ) : goal.scoreTypeId === 2 ? (
            <FrequencyGoal
              goal={goal}
              scoreMutation={createScoreMutation}
              userId={session.userId}
            />
          ) : (
            goal.scoreTypeId === 3 && (
              <DurationGoal
                goal={goal}
                scoreMutation={createScoreMutation}
                userId={session.userId}
              />
            )
          )}
        </div>
      ) : (
        <EmptyGoal />
      )}
    </>
  )
}

const PercentageGoal = ({ goal, scoreMutation, userId }) => {
  return (
    <>
      <ScoreForm
        submitText="Add Score"
        onSubmit={async ({ score }) => {
          try {
            await scoreMutation({
              value: score,
              goalId: goal.id,
              scoreTypeId: 1,
              createdBy: userId,
            })
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </>
  )
}

const FrequencyGoal = ({ goal, scoreMutation, userId }) => {
  const [score, setScore] = useState(0)

  return (
    <div className="flex justify-center items-center space-x-6">
      <button
        type="button"
        className="inline-flex justify-center items-center p-2 mb-9 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        onClick={() => setScore(score - 1)}
      >
        <MinusSmIcon className="h-8 w-8" aria-hidden="true" />
      </button>
      <Form
        submitText="Save"
        schema={createScoreSchema}
        initialValues={{ value: 0 }}
        className="inline-flex flex-col justify-center items-center space-y-6"
        onSubmit={async () => {
          try {
            await scoreMutation({
              value: score,
              goalId: goal.id,
              scoreTypeId: 2,
              createdBy: userId,
            })
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      >
        <LabeledTextField
          type="text"
          name="score"
          label="Score"
          onChange={(e) => setScore(Number(e.target.value))}
          value={score}
          placeholder="00"
          className="text-3xl text-center w-16 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
        />
      </Form>
      <button
        type="button"
        className="inline-flex justify-center items-center p-2 mb-9 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        onClick={() => setScore(score + 1)}
      >
        <PlusSmIcon className="h-8 w-8" aria-hidden="true" />
      </button>
    </div>
  )
}

const DurationGoal = ({ goal, scoreMutation, userId }) => {
  return (
    <>
      <Timer />
    </>
  )
}

const EmptyGoal = () => {
  return (
    <div className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center">
      <ChevronDoubleLeftIcon className="mx-auto h-6 w-6 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No goal selected</h3>
      <p className="mt-1 text-sm text-gray-500">Select a goal from the goal tree</p>
    </div>
  )
}
