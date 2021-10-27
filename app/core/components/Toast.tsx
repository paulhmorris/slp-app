import { Transition } from '@headlessui/react'
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  CogIcon,
  XIcon,
} from '@heroicons/react/solid'
import { Fragment, useEffect, useState } from 'react'

export interface ToastProps {
  show: boolean
  title?: string
  message?: string
  type?: 'success' | 'error' | 'info'
}

export const Toast = ({ show, title, message, type }: ToastProps) => {
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    setShowToast(show)
  }, [show])

  return (
    <Transition
      show={showToast}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {type === 'success' ? (
                <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
              ) : type === 'error' ? (
                <XCircleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
              ) : type === 'info' ? (
                <InformationCircleIcon className="h-6 w-6 text-blue-700" aria-hidden="true" />
              ) : (
                <CogIcon className="h-6 w-6 text-gray-500" aria-hidden="true" />
              )}
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">{title}</p>
              <p className="mt-1 text-sm text-gray-500">{message}</p>
            </div>
            {type !== 'success' && (
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    setShowToast(false)
                  }}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Transition>
  )
}
