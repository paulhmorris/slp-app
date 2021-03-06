import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid'
import ScoreButton from 'app/core/components/buttons/ScoreButton'
import { Form } from 'app/core/components/forms/Form'
import LabeledTextField from 'app/core/components/forms/LabeledTextField'
import { Toast } from 'app/core/components/Toast'
import { FORM_ERROR, ScoreForm } from 'app/scores/components/ScoreForm'
import { Timer } from 'app/scores/components/Timer'
import createScore from 'app/scores/mutations/createScore'
import getScores from 'app/scores/queries/getScores'
import { createScoreSchema } from 'app/scores/validations'
import { invalidateQuery, useMutation, useSession } from 'blitz'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { GoalWithAllRelations } from 'types'

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

type GoalToScoreProps = {
  goal: GoalWithAllRelations
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
      <div className="container flex flex-col items-center space-y-4 justify-center mx-auto py-8 pl-8 pr-12 bg-white rounded-md border border-gray-200 max-w-sm">
        {goal.defaultScoreTypeId === 1 ? (
          <PercentageGoal goal={goal} scoreMutation={createScoreMutation} userId={session.userId} />
        ) : goal.defaultScoreTypeId === 2 ? (
          <FrequencyGoal goal={goal} scoreMutation={createScoreMutation} userId={session.userId} />
        ) : (
          goal.defaultScoreTypeId === 3 && (
            <DurationGoal goal={goal} scoreMutation={createScoreMutation} userId={session.userId} />
          )
        )}
      </div>
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
      <ScoreButton
        color="red"
        icon={<MinusSmIcon className="h-8 w-8" />}
        callback={() => setScore(score - 1)}
      />
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
      <ScoreButton
        color="green"
        icon={<PlusSmIcon className="h-8 w-8" />}
        callback={() => setScore(score + 1)}
      />
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
