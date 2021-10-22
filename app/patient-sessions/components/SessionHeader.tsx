import { ClockIcon } from '@heroicons/react/outline'
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  ExternalLinkIcon,
  LocationMarkerIcon,
  RefreshIcon,
} from '@heroicons/react/solid'
import { Link, Routes, useMutation } from 'blitz'
import { Patient, PatientSession } from 'db'
import updatePatientSession from '../mutations/updatePatientSession'

interface SessionHeaderProps {
  patient: Patient
  session: PatientSession
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const SessionHeader = ({ patient, session }: SessionHeaderProps) => {
  const [updateSessionMutation] = useMutation(updatePatientSession)

  return (
    <div className="lg:flex lg:items-center lg:justify-between mt-4">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          {patient.firstName} {patient.lastName}
        </h2>
        <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <BriefcaseIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Full-time
          </div>

          <div className="mt-2 flex items-center text-sm text-gray-500">
            <LocationMarkerIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Remote
          </div>

          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CurrencyDollarIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            $120k &ndash; $140k
          </div>

          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CalendarIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Closing on January 9, 2020
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        <span className="sm:block ml-3">
          <Link href={Routes.ShowPatientPage({ patientId: patient.id })}>
            <a
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              target="_blank"
            >
              <ExternalLinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
              View Patient
            </a>
          </Link>
        </span>

        <span className="ml-3">
          {session.sessionStatusId === 1 ? (
            <button type="button" className="btn-primary">
              <ClockIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Start Session
            </button>
          ) : session.sessionStatusId === 2 ? (
            <button type="button" className="btn-primary">
              <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Complete Session
            </button>
          ) : (
            <button type="button" className="btn-white">
              <RefreshIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Reopen Session
            </button>
          )}
        </span>
      </div>
    </div>
  )
}
