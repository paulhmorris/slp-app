import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/outline'
import { Link, RouteUrlObject } from 'blitz'
import { ReactNode } from 'react'

interface SidebarCardProps {
  title: string
  action?: string
  actionRoute?: RouteUrlObject
  children: ReactNode
}

export const SidebarCard = ({ title, action, actionRoute, children }: SidebarCardProps) => {
  return (
    <Disclosure>
      {({ open }) => (
        <div className="w-full p-4 border border-gray-200 shadow-sm whitespace-nowrap">
          <div className=" mb-2">
            <Disclosure.Button className="flex w-full items-center justify-between uppercase text-sm font-medium text-gray-500">
              {title}
              <ChevronUpIcon
                className={`${
                  open ? 'transform rotate-180' : ''
                } h-4 w-4 transform text-current transition-colors hover:text-indigo-700`}
              />
            </Disclosure.Button>
            {action && actionRoute && (
              <Link href={actionRoute}>
                <a className="text-blue-600 text-xs capitalize hover:underline">{action}</a>
              </Link>
            )}
          </div>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Disclosure.Panel>{children}</Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  )
}
