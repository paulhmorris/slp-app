import { getBadgeColor, getChronologicalAge } from 'app/core/lib/helpers'
import { Link, Routes } from 'blitz'
import dayjs from 'dayjs'
import { Appointment, Contact, Patient } from 'db'

interface IPatientHeading {
  patient: Patient
  contact: Contact
  upcomingAppointments: Appointment[]
}

export const PatientHeading = ({ patient, contact, upcomingAppointments }: IPatientHeading) => {
  return (
    <div>
      <div className="flex items-center">
        <h1 className="text-3xl mr-5">
          {contact.firstName} {contact.lastName}
        </h1>
        <span className={`tag ${getBadgeColor(patient.isActive ? 'active' : 'inactive')}`}>
          {patient.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

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
        <Link href={Routes.EditPatientPage({ patientId: patient.id })}>
          <a className="ml-2">Edit</a>
        </Link>
      </div>
    </div>
  )
}
