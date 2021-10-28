import { Disclosure } from '@headlessui/react'
import { FolderIcon, FolderOpenIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { GoalToScore } from 'app/goals/components/GoalToScore'

export const PatientActiveGoals = ({ goals, patientId }) => {
  const [currentGoal, setCurrentGoal] = useState(goals[0])

  const parentGoals = goals.filter((g) => !g.parentGoalId)
  const childGoals = goals.filter((g) => g.parentGoalId)

  return (
    <div className="flex flex-1 justify-between">
      <div className="flex-1 pr-8">
        <h2>Goals In Progress</h2>
        <div className="divide-y space-y-4 divide-gray-200 mt-2 text-sm">
          {parentGoals.map((pg) => (
            <Disclosure as="ul" key={pg.id} className="pt-4 space-y-2">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    key={pg.id}
                    className="text-left w-full flex justify-start items-center text-gray-800 focus:outline-none"
                  >
                    <span className="h-7 flex items-center">
                      {open ? (
                        <FolderOpenIcon
                          className={`h-6 w-6 ${open ? 'text-indigo-600' : 'text-gray-400'}`}
                          aria-hidden="true"
                        />
                      ) : (
                        <FolderIcon
                          className={`h-6 w-6 ${open ? 'text-indigo-600' : 'text-gray-400'}`}
                          aria-hidden="true"
                        />
                      )}
                    </span>
                    <span className="ml-4 font-medium text-gray-800">{pg.category?.name}</span>
                  </Disclosure.Button>
                  <Disclosure.Panel as="li" static={currentGoal?.parentGoalId === pg.id}>
                    {parentGoals
                      .filter((g) => g.category?.id === pg.category?.id)
                      .map((goal) => (
                        <Disclosure as="ul" key={goal.id} className="pt-4 space-y-2">
                          {({ open }) => (
                            <>
                              <Disclosure.Button
                                key={goal.id}
                                className="text-left w-full flex justify-start items-center text-gray-400 focus:outline-none"
                              >
                                <span className="ml-6 h-7 flex items-center">
                                  {open ? (
                                    <FolderOpenIcon
                                      className={`h-6 w-6 ${
                                        open ? 'text-indigo-600' : 'text-gray-400'
                                      }`}
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
                                <span className="ml-3 font-medium text-gray-900">{goal.title}</span>
                              </Disclosure.Button>
                              {childGoals.map(
                                (childGoal) =>
                                  childGoal.parentGoalId === goal.id && (
                                    <Disclosure.Panel
                                      static={currentGoal?.id === childGoal.id}
                                      as="button"
                                      onClick={() => setCurrentGoal(childGoal)}
                                      key={childGoal.id}
                                      className={`${
                                        currentGoal?.id === childGoal.id
                                          ? 'bg-indigo-100 text-indigo-800'
                                          : 'bg-white text-gray-500'
                                      } block w-auto text-left py-2 px-3 ml-10  shadow overflow-hidden rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                    >
                                      <span>{childGoal.title}</span>
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
        <GoalToScore goal={currentGoal} patientId={patientId} />
      </div>
    </div>
  )
}
