import { css } from '@emotion/react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { Dispatch, Fragment, useRef } from 'react'
import { PulseLoader } from 'react-spinners'
import { SetStateAction } from 'react-test-renderer/node_modules/@types/react'
import { classNames } from '../lib/helpers'

interface IModal {
  type: 'success' | 'warning' | 'confirm'
  title: string
  description: string
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  callback?: () => any
  isLoading?: boolean
  cancelText?: string
  confirmText?: string
}

const loader = css`
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const Modal = ({
  type = 'confirm',
  title,
  description,
  cancelText = 'cancel',
  confirmText = 'confirm',
  showModal,
  setShowModal,
  callback,
  isLoading,
}: IModal) => {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => setShowModal(false)}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="capitalize text-lg leading-6 font-medium text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{description}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  disabled={isLoading}
                  className={classNames(
                    isLoading && 'text-transparent',
                    'capitalize btn-danger w-full sm:ml-3 sm:w-auto sm:text-sm'
                  )}
                  onClick={callback}
                >
                  {isLoading && (
                    <PulseLoader css={loader} size={8} speedMultiplier={0.75} color="white" />
                  )}
                  {confirmText}
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  className="capitalize mt-3 w-full btn-white focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowModal(false)}
                  ref={cancelButtonRef}
                >
                  {cancelText}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
