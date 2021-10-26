import { ClockIcon } from '@heroicons/react/outline'
import { css } from '@emotion/react'
import {
  CalendarIcon,
  CheckCircleIcon,
  ExternalLinkIcon,
  RefreshIcon,
  CakeIcon,
} from '@heroicons/react/solid'
import { PulseLoader } from 'react-spinners'
import { Link, Routes } from 'blitz'
import { Patient, PatientSession } from 'db'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import dayjs from 'dayjs'
dayjs.extend(dayOfYear)

interface SessionHeaderProps {
  patient: Patient
  session: PatientSession
  loading: boolean
  updateSession: (status: number) => Promise<void>
}

export const SessionHeader = ({ patient, session, updateSession, loading }: SessionHeaderProps) => {
  const loader = css`
    position: absolute;
    top: 53%;
    left: 50%;
    transform: translate(-50%, -50%);
  `

  return (
    <div className="lg:flex lg:items-center lg:justify-between mt-6">
      <div className="mt-5 flex space-x-3 lg:mt-0">
        <span>
          {session.sessionStatusId === 1 ? (
            <button
              type="button"
              disabled={loading}
              className={`btn-primary ${loading && 'text-transparent'}`}
              onClick={() => updateSession(2)}
            >
              {loading && (
                <PulseLoader css={loader} color="white" size={8} speedMultiplier={0.75} />
              )}
              <ClockIcon className="-ml-1 mr-2 h-5 w-5 stroke-current" aria-hidden="true" />
              Start Session
            </button>
          ) : session.sessionStatusId === 2 ? (
            <button
              type="button"
              disabled={loading}
              className={`btn-secondary ${loading && 'text-transparent'}`}
              onClick={() => updateSession(3)}
            >
              {loading && (
                <PulseLoader css={loader} color="white" size={8} speedMultiplier={0.75} />
              )}
              <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5 fill-current" aria-hidden="true" />
              Complete Session
            </button>
          ) : (
            <button
              type="button"
              disabled={loading}
              className={`btn-white ${loading && 'text-transparent'}`}
              onClick={() => updateSession(2)}
            >
              {loading && (
                <PulseLoader css={loader} color="#4F46E5" size={8} speedMultiplier={0.75} />
              )}
              <RefreshIcon className="-ml-1 mr-2 h-5 w-5 fill-current" aria-hidden="true" />
              Reopen Session
            </button>
          )}
        </span>
        <span className="sm:block">
          <Link href={Routes.ShowPatientPage({ patientId: patient.id })}>
            <a className="btn-white" target="_blank">
              <ExternalLinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-600" aria-hidden="true" />
              View Patient
            </a>
          </Link>
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-700 sm:text-3xl">
          {patient.firstName} {patient.lastName}
        </h2>
        <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            {dayjs().dayOfYear() - dayjs(patient.dateOfBirth).dayOfYear() > -7 &&
            dayjs().dayOfYear() - dayjs(patient.dateOfBirth).dayOfYear() < 7 ? (
              <CakeIcon
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-purple-500"
                aria-hidden="true"
              />
            ) : (
              <CalendarIcon
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            )}
            <span>
              Date of birth: {dayjs(patient.dateOfBirth).format('MM/DD/YYYY')} (
              {dayjs().diff(dayjs(patient.dateOfBirth), 'years', false)} years old)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
