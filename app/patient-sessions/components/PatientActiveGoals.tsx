import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { FolderIcon, FolderOpenIcon } from '@heroicons/react/solid'
import getGoals from 'app/goals/queries/getGoals'
import { useParam, useQuery } from 'blitz'

export const PatientActiveGoals = () => {
  const patientId = useParam('patientId', 'number')
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
        {parentGoals.map(
          (goal) =>
            childGoals.filter((g) => g.parentGoalId === goal.id).length > 0 && (
              <Disclosure as="ul" key={goal.id} className="group pt-4 space-y-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      key={goal.id}
                      className="text-left w-full flex justify-between items-center text-gray-400 focus:outline-none"
                    >
                      <span className="font-medium text-gray-900">{goal.title}</span>
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
                    </Disclosure.Button>
                    {childGoals.map(
                      (cg) =>
                        cg.parentGoalId === goal.id && (
                          <Disclosure.Panel
                            as="button"
                            key={cg.id}
                            className="block w-auto text-left py-2 px-3 ml-3 bg-white shadow overflow-hidden rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <p className="text-gray-600">{cg.title}</p>
                          </Disclosure.Panel>
                        )
                    )}
                  </>
                )}
              </Disclosure>
            )
        )}
      </div>
    </>
  )
}
