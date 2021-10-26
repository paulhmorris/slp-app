import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import getGoals from 'app/goals/queries/getGoals'
import { useParam, useQuery } from 'blitz'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

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
      <ul role="list" className="divide-y space-y-4 divide-gray-200 mt-2 text-sm">
        {parentGoals.map((goal) => (
          <Disclosure as="li" key={goal.id} className="pt-6">
            {({ open }) => (
              <>
                <Disclosure.Button
                  key={goal.id}
                  className="mt-2 text-left w-full flex justify-between items-start text-gray-400 focus:outline-none"
                >
                  <span className="font-medium text-gray-900">{goal.name}</span>
                  <span className="ml-6 h-7 flex items-center">
                    <ChevronDownIcon
                      className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                      aria-hidden="true"
                    />
                  </span>
                </Disclosure.Button>
                {childGoals.map(
                  (cg) =>
                    cg.parentGoalId === goal.id && (
                      <Disclosure.Panel key={cg.id} className="ml-3 pr-12">
                        <p className="text-gray-600">{cg.name}</p>
                      </Disclosure.Panel>
                    )
                )}
              </>
            )}
          </Disclosure>
        ))}
      </ul>
    </>
  )
}
