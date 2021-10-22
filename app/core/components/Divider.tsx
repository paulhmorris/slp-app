import { ReactNode } from 'react'

interface DividerProps {
  text?: string
  padding?: string
  align?: 'start' | 'center' | 'end'
  children?: ReactNode
}

export const Divider = ({ text, align = 'center', padding = '4', children }: DividerProps) => {
  return (
    <div className={`relative py-${padding}`}>
      <div className="absolute justify- inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className={`relative flex justify-${align}`}>
        <span className="px-2 bg-white text-sm text-gray-500">{text}</span>
        {children}
      </div>
    </div>
  )
}
