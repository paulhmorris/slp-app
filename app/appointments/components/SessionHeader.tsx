import { css } from '@emotion/react'
import { CakeIcon, CalendarIcon, ExternalLinkIcon } from '@heroicons/react/solid'
import { getChronologicalAge, isBirthday } from 'app/core/lib/helpers'
import { Link, Routes } from 'blitz'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import timezone from 'dayjs/plugin/timezone'
import { Appointment, Contact, Patient } from 'db'

dayjs.extend(timezone)
dayjs.extend(advancedFormat)

// move session status nexct to button, move view patient by patient
//

interface SessionHeaderProps {
  patient: Patient
  contact: Contact
  appointment: Appointment
  loading: boolean
  updateSession: (status: number) => Promise<void>
}

export const SessionHeader = ({
  patient,
  contact,
  appointment,
  updateSession,
  loading,
}: SessionHeaderProps) => {
  const loader = css`
    position: absolute;
    top: 53%;
    left: 50%;
    transform: translate(-50%, -50%);
  `

  return (
    <div className="lg:flex lg:items-center lg:justify-between mt-6">
      <div className="mt-5 flex space-x-3 lg:mt-0 items-center">
        <div className="flex-0 mr-8">
          <PatientDetail patient={patient} contact={contact} />
        </div>

        {/* <span>
          {status !== 5 && (
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
                (status === 3 || status === 5) && (
                  <>
                    <RefreshIcon className="-ml-1 mr-2 h-5 w-5 fill-current" aria-hidden="true" />
                    <span>Reopen Session</span>
                  </>
                )
              )}
            </button>
          )}
        </span>
        {status === 3 && (
          <span className="sm:block">
            <Link href={Routes.ShowPatientPage({ patientId: patient.id })}>
              <a className="btn-primary">
                <UploadIcon className="-ml-1 mr-2 h-5 w-5 stroke-current" aria-hidden="true" />
                Submit To Insurance
              </a>
            </Link>
          </span>
        )} */}
      </div>
      <span className="sm:block">
        <Link href={Routes.ShowPatientPage({ patientId: patient.id })}>
          <a className="btn-white" target="_blank">
            <ExternalLinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-600" aria-hidden="true" />
            View Patient
          </a>
        </Link>
      </span>
      {/* <div
        className="relative cursor-default"
        onMouseEnter={() => setShowStatusTime(true)}
        onMouseLeave={() => setShowStatusTime(false)}
      >
        <span className={`tag-2xl ${getBadgeColor(appointment.status.name)}`}>
          {appointment.status.name}
          {appointment.sessionStatusId === 2 && (
            <span className="flex absolute h-2.5 w-2.5 top-0 right-0 -mt-1 -mr-1">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-70"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
          )}
        </span>
      </div> */}
    </div>
  )
}

const PatientDetail = ({ contact }) => {
  return (
    <>
      <h2 className="text-2xl font-bold leading-7 text-gray-700 sm:text-3xl">
        {contact.firstName} {contact.lastName}
      </h2>
      <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
        <div className="mt-2 flex flex-1 justify-start items-center text-sm text-gray-500">
          {isBirthday(contact.dateOfBirth) ? (
            <CakeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-purple-500" aria-hidden="true" />
          ) : (
            <CalendarIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          )}
          <span>{getChronologicalAge(contact.dateOfBirth)}</span>
        </div>
      </div>
    </>
  )
}
