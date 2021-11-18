import { classNames } from 'app/core/lib/helpers'
import { Link, NotFoundError, Routes, useParam, useRouter } from 'blitz'

export const PatientTabs = () => {
  const patientId = useParam('patientId', 'number')
  const router = useRouter()

  if (!patientId) {
    throw new NotFoundError('Patient not found')
  }

  const tabs = [
    { name: 'Overview', route: Routes.PatientOverviewPage({ patientId }), current: false },
    { name: 'Billing', route: Routes.PatientBillingPage({ patientId }), current: false },
    { name: 'Insurance', route: Routes.PatientInsurancePage({ patientId }), current: false },
    { name: 'Contacts', route: Routes.PatientRelationsDetailsPage({ patientId }), current: false },
    { name: 'Settings', route: Routes.PatientSettingsPage({ patientId }), current: false },
  ]

  // TODO: redo this using state?
  function setCurrentNavigation() {
    tabs.forEach((tab) => {
      if (tab.route.pathname === router.route) {
        tab.current = true
      } else {
        tab.current = false
      }
    })
  }

  setCurrentNavigation()

  return (
    <div className="mb-4">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          defaultValue={tabs.find((tab) => tab.current)?.name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab, tabIdx) => (
            <Link key={tabIdx} href={tab.route}>
              <a
                key={tab.name}
                className={classNames(
                  tab.current
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-indigo-700',
                  'px-3 py-2 font-medium text-sm rounded-md'
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
