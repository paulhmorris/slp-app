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
    <>
      <div className="w-full p-4 border border-gray-200 shadow-sm whitespace-nowrap">
        <div className=" mb-2 mr-4">
          <span className="uppercase text-sm font-medium text-gray-500">{title}</span>
          {action && actionRoute && (
            <Link href={actionRoute}>
              <a className="text-blue-600 text-xs hover:underline">{action}</a>
            </Link>
          )}
        </div>
        {children}
      </div>
    </>
  )
}
