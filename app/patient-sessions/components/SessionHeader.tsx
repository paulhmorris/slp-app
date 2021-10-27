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
import dayjs from 'dayjs'
import { getTagStyles } from 'app/core/lib/helpers'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import timezone from 'dayjs/plugin/timezone'
import { useState } from 'react'
import { Tooltip } from 'app/core/components/Tooltip'
dayjs.extend(dayOfYear)
dayjs.extend(timezone)
dayjs.extend(advancedFormat)

interface SessionHeaderProps {
  patient: Patient
  session: PatientSession & { status: { name: string } }
  loading: boolean
  updateSession: (status: number) => Promise<void>
}

export const SessionHeader = ({ patient, session, updateSession, loading }: SessionHeaderProps) => {
  const [showStatusTime, setShowStatusTime] = useState(false)
  const status = session.sessionStatusId
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
          <button
            type="button"
            disabled={loading}
            className={`${
              status === 1 ? 'btn-primary' : status === 2 ? 'btn-secondary' : 'btn-white'
            } ${loading && 'text-transparent'}`}
            onClick={() => updateSession(status === 2 ? 3 : 2)}
          >
            {loading && (
              <PulseLoader
                css={loader}
                color={`${status !== 2 && status !== 1 ? '#4f46e5' : '#fff'}`}
                size={8}
                speedMultiplier={0.75}
              />
            )}
            {status === 1 ? (
              <>
                <ClockIcon className="-ml-1 mr-2 h-5 w-5 stroke-current" aria-hidden="true" />
                <span>Start Session</span>
              </>
            ) : status === 2 ? (
              <>
                {' '}
                <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5 fill-current" aria-hidden="true" />
                <span>Complete Session</span>
              </>
            ) : (
              <>
                <RefreshIcon className="-ml-1 mr-2 h-5 w-5 fill-current" aria-hidden="true" />
                <span>Reopen Session</span>
              </>
            )}
          </button>
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
      <div
        className="relative cursor-default"
        onMouseEnter={() => setShowStatusTime(true)}
        onMouseLeave={() => setShowStatusTime(false)}
      >
        <span className={`tag-2xl ${getTagStyles(session.status.name)}`}>
          {session.status.name}
          {session.sessionStatusId === 2 && (
            <span className="flex absolute h-2.5 w-2.5 top-0 right-0 -mt-1 -mr-1">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-70"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
          )}
        </span>
        <Tooltip show={showStatusTime}>
          Last updated: {dayjs(session.updatedAt).format('M/D/YY h:mma z')}
        </Tooltip>
      </div>
      <div className="flex-0 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-700 sm:text-3xl">
          {patient.firstName} {patient.lastName}
        </h2>
        <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
          <div className="mt-2 flex flex-1 justify-end items-center text-sm text-gray-500">
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
              DOB: {dayjs(patient.dateOfBirth).format('MM/DD/YYYY')} (
              {dayjs().diff(dayjs(patient.dateOfBirth), 'years', false)} years old)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
