import getScores from 'app/scores/queries/getScores'
import { invalidateQuery, useQuery } from 'blitz'
import { Line, ChartProps } from 'react-chartjs-2'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import EmptyState from 'app/core/components/EmptyState'
import { Goal, GoalCategory, GoalStatus, Score } from 'db'

interface GoalChartProps {
  goal:
    | Goal & {
        parentGoal: Goal | null
        status: GoalStatus
        category: GoalCategory
      }
}

export const GoalChart = ({ goal }: GoalChartProps) => {
  const [{ scores }] = useQuery(getScores, {
    where: { goalId: goal.id },
    orderBy: { createdAt: 'asc' },
  })
  const scoreLabels = scores.map((score) =>
    // Show year on label if from previous year
    dayjs(score.createdAt).year() !== dayjs().year()
      ? dayjs(score.createdAt).format('MM/DD/YY')
      : dayjs(score.createdAt).format('MM/DD')
  )
  const scoreValues = scores.map((score) => score.value)

  useEffect(() => {
    invalidateQuery(getScores)
  }, [goal])

  const data = {
    labels: scoreLabels,
    datasets: [
      {
        label: 'Score',
        data: scoreValues,
        fill: false,
        backgroundColor: '#059669',
        borderColor: '#059669',
      },
    ],
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        padding: 12,
        displayColors: false,
        backgroundColor: 'rgba(55, 65, 81, 1)',
      },
      legend: {
        display: false,
      },
    },
  }

  return (
    <div>
      <h3 className="text-center">{goal?.title}</h3>
      {scores.length ? (
        <Line className="my-8" data={data} options={options} />
      ) : (
        <EmptyState message="There are no scores for this goal. Add one to populate the chart." />
      )}
    </div>
  )
}
