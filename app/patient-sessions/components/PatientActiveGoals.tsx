import { Disclosure } from '@headlessui/react'
import { FolderIcon, FolderOpenIcon } from '@heroicons/react/solid'
import { FC, Suspense, useEffect } from 'react'
import { GoalToScore } from 'app/goals/components/GoalToScore'
import { Goal, GoalCategory, GoalStatus } from 'db'
import { classNames, getBadgeColor } from 'app/core/lib/helpers'
import { GoalChart } from 'app/goals/components/GoalChart'

interface GoalTreeProps {
  goals: (Goal & { category: GoalCategory; parentGoal: Goal | null; status: GoalStatus })[]
  currentGoal:
    | (Goal & { category: GoalCategory; parentGoal: Goal | null; status: GoalStatus })
    | undefined
  patientId: number
  setGoal: (goal: Goal) => void
}

export const PatientActiveGoals: FC<GoalTreeProps> = ({
  goals,
  currentGoal,
  patientId,
  setGoal,
}) => {
  const parentGoals = goals.filter((g) => !g.parentGoalId)
  const childGoals = goals.filter((g) => g.parentGoalId)
  const categories = goals.map((g) => g.category.name)
  const categoryNames = Array.from(new Set(categories))

  return (
    <>
      <div className="flex flex-1 justify-between">
        <div className="flex-1 pr-8">
          <h2>Goals</h2>
          <div className="divide-y space-y-4 divide-gray-200 mt-2 text-sm">
            {categoryNames.map((categoryName, categoryIdx) => (
              <Disclosure as="ul" key={categoryIdx} className="pt-4 space-y-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      key={categoryIdx}
                      className="text-left w-full flex justify-start items-center text-gray-800 focus:outline-none"
                    >
                      <span className="h-7 flex items-center">
                        {open ? (
                          <FolderOpenIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                        ) : (
                          <FolderIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                        )}
                      </span>
                      <span
                        className={classNames(
                          getBadgeColor(categoryName),
                          'tag-lg ml-4 font-medium'
                        )}
                      >
                        {categoryName}
                      </span>
                    </Disclosure.Button>
                    <Disclosure.Panel as="li">
                      {parentGoals
                        .filter((g) => g.category?.name === categoryName)
                        .map((goal) => (
                          <Disclosure as="ul" key={goal.id} className="pt-3 space-y-2">
                            {({ open }) => (
                              <>
                                <Disclosure.Button
                                  key={goal.id}
                                  className="text-left w-full flex justify-start items-center text-gray-400 focus:outline-none"
                                >
                                  <span className="ml-6 h-7 flex items-center">
                                    {open ? (
                                      <FolderOpenIcon
                                        className="h-6 w-6 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <FolderIcon
                                        className={`h-6 w-6 ${
                                          open ? 'text-indigo-600' : 'text-gray-400'
                                        }`}
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                  <span className="ml-3 font-medium text-gray-900">
                                    {goal.title}
                                  </span>
                                </Disclosure.Button>
                                {childGoals.map(
                                  (childGoal) =>
                                    childGoal.parentGoalId === goal.id && (
                                      <Disclosure.Panel
                                        as="button"
                                        onClick={() => setGoal(childGoal)}
                                        key={childGoal.id}
                                        className={`${
                                          currentGoal?.id === childGoal.id
                                            ? 'ring-2 ring-offset-2 ring-green-500'
                                            : 'bg-white text-gray-500'
                                        } block w-auto text-left py-2 px-3 ml-16  shadow overflow-hidden rounded-md focus:outline-none`}
                                      >
                                        <span>
                                          (Id: {childGoal.id}){childGoal.title}
                                        </span>
                                      </Disclosure.Panel>
                                    )
                                )}
                              </>
                            )}
                          </Disclosure>
                        ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
        <div className="flex-1 px-8">
          <Suspense fallback={<div>Loading...</div>}>
            <GoalToScore goal={currentGoal} patientId={patientId} />
          </Suspense>
        </div>
      </div>
      <div>
        {currentGoal && (
          <div className="flex-1 mt-6 mb-24max-h-10">
            <Suspense fallback={<div>Loading...</div>}>
              <GoalChart goal={currentGoal} />
            </Suspense>
          </div>
        )}
      </div>
    </>
  )
}
