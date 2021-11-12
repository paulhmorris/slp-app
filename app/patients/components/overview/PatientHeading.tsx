import { getChronologicalAge } from 'app/core/lib/helpers'
import { Link, Routes } from 'blitz'
import dayjs from 'dayjs'
import { Appointment, Contact } from 'db'

interface IPatientHeading {
  patientId: number
  contact: Contact
  upcomingAppointments: Appointment[]
}

export const PatientHeading = ({ patientId, contact, upcomingAppointments }: IPatientHeading) => {
  return (
    <div>
      <h1 className="text-3xl">
        {contact.firstName} {contact.lastName}
      </h1>

      <div className="text-sm">
        <span>{dayjs(contact.dateOfBirth).format('MM/DD/YYYY')}</span>{' '}
        <span>({getChronologicalAge(contact.dateOfBirth)})</span>
        {' | '}
        {upcomingAppointments && (
          <>
            <span>Next appt: </span>
            <Link
              // @ts-ignore
              href={Routes.ShowAppointmentPage({ appointmentId: upcomingAppointments[0]?.id })}
            >
              <a>{dayjs(upcomingAppointments[0]?.scheduledAt).format('MM/DD/YY')}</a>
            </Link>
            <span> ({upcomingAppointments.length} left)</span>
            {' |'}
          </>
        )}
        <Link href={Routes.EditPatientPage({ patientId })}>
          <a className="ml-2">Edit</a>
        </Link>
      </div>
    </div>
  )
}
