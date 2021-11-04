import { ExclamationIcon } from '@heroicons/react/outline'
import React from 'react'

export interface EmptyStateProps {
  title?: string
  message?: string
  icon?: JSX.Element
}

export default function EmptyState({
  title,
  message,
  icon = <ExclamationIcon className="mx-auto h-6 w-6 text-gray-400" />,
}: EmptyStateProps) {
  return (
    <div className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center ">
      {icon}
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
      <span className="mt-2 block text-sm font-medium text-gray-500">{message}</span>
    </div>
  )
}
