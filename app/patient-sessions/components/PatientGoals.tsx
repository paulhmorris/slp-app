import getGoals from 'app/goals/queries/getGoals'
import { useParam, useQuery } from 'blitz'

export const PatientActiveGoals = () => {
  const patientId = useParam('patientId', 'number')
  const [{ goals }] = useQuery(getGoals, { where: { patientId, goalStatusId: 1 } })

  return (
    <div>
      <h2>Goals In Progress</h2>
      <h3 className="mb-3 mt-6">Long Term:</h3>
      <div>
        <ul role="list" className="space-y-3">
          {goals.map(
            (goal) =>
              goal.isLongTerm && (
                <li key={goal.id} className="bg-white shadow overflow-hidden rounded-md px-6 py-4">
                  {goal.name}
                </li>
              )
          )}
        </ul>
      </div>
      <h3 className="mb-3 mt-6">Short Term:</h3>
      <div>
        <ul role="list" className="space-y-2">
          {goals.map(
            (goal) =>
              !goal.isLongTerm && (
                <li key={goal.id} className="bg-white shadow overflow-hidden rounded-md px-6 py-4">
                  {goal.name}
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  )
}
