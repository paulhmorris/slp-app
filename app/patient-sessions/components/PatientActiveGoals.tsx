import { Disclosure, Transition } from '@headlessui/react'
import { FolderIcon, FolderOpenIcon } from '@heroicons/react/solid'
import { useQuery } from 'blitz'
import getGoals from 'app/goals/queries/getGoals'

type PatientActiveGoalsProps = {
  patientId: number
}

export const PatientActiveGoals = ({ patientId }: PatientActiveGoalsProps) => {
  const [{ goals }] = useQuery(getGoals, {
    where: { patientId, goalStatusId: 1 },
    orderBy: { createdAt: 'desc' },
  })

  const parentGoals = goals.filter((g) => !g.parentGoalId)
  const childGoals = goals.filter((g) => g.parentGoalId)

  return (
    <>
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
                        className={`h-6 w-6 text-${open ? 'indigo-600' : 'gray-400'}`}
                        aria-hidden="true"
                      />
                    ) : (
                      <FolderIcon
                        className={`h-6 w-6 text-${open ? 'indigo-600' : 'gray-400'}`}
                        aria-hidden="true"
                      />
                    )}
                  </span>
                  <span className="ml-4 font-medium text-gray-800">{pg.category?.name}</span>
                </Disclosure.Button>
                <Disclosure.Panel>
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
                                    className={`h-6 w-6 text-${open ? 'indigo-600' : 'gray-400'}`}
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <FolderIcon
                                    className={`h-6 w-6 text-${open ? 'indigo-600' : 'gray-400'}`}
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                              <span className="ml-3 font-medium text-gray-900">{goal.title}</span>
                            </Disclosure.Button>
                            {childGoals.map(
                              (cg) =>
                                cg.parentGoalId === goal.id && (
                                  <Disclosure.Panel
                                    as="button"
                                    key={cg.id}
                                    className="block w-auto text-left py-2 px-3 ml-10 bg-white shadow overflow-hidden rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                  >
                                    <span className="text-gray-600">{cg.title}</span>
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
    </>
  )
}
