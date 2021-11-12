import { classNames } from 'app/core/lib/helpers'
import { useState } from 'react'

const initialState = [
  { name: 'Overview', href: '#', current: true },
  { name: 'Billing', href: '#', current: false },
  { name: 'Insurance', href: '#', current: false },
  { name: 'Contacts', href: '#', current: false },
  { name: 'Settings', href: '#', current: false },
]

export default function PatientTabs({ onTabChange }) {
  const [tabs, setTabs] = useState(initialState)

  const onChange = (tab) => {}

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          defaultValue={tabs.find((tab) => tab.current)?.name}
          onChange={() => onChange}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              className={classNames(
                tab.current ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700',
                'px-3 py-2 font-medium text-sm rounded-md'
              )}
              aria-current={tab.current ? 'page' : undefined}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
