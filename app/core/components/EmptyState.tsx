import { ExclamationIcon } from '@heroicons/react/outline'

export interface EmptyStateProps {
  message?: string
  icon?: JSX.Element
}

export default function EmptyState({
  message = 'No results found',
  icon = <ExclamationIcon className="mx-auto h-6 w-6 text-gray-400" />,
}) {
  return (
    <div className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center ">
      {icon}
      <span className="mt-2 block text-sm font-medium text-gray-400">{message}</span>
    </div>
  )
}
