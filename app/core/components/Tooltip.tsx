import { Transition } from '@headlessui/react'

export const Tooltip = ({ show, children }) => {
  return (
    <Transition
      as="div"
      show={show}
      enter="transition-opacity ease-in duration-100 delay-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-0"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="absolute top-0 z-10 w-auto py-2 px-3 -mt-1 text-xs leading-tight text-white transform -translate-y-full -translate-x-6 bg-gray-700 rounded-lg shadow-lg whitespace-nowrap"
    >
      {children}
      <svg
        className="absolute z-10 w-6 h-6 transform translate-x-9 delay fill-current stroke-current text-gray-700"
        width="8"
        height="8"
      >
        <rect x="12" y="-10" width="8" height="8" transform="rotate(45)" />
      </svg>
    </Transition>
  )
}
