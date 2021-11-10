import { useQuery, Link, Routes } from 'blitz'
import getPatientContacts from 'app/patient-contacts/queries/getPatientContacts'
import { SidebarCard } from './SidebarCard'
import { humanizeEnum } from 'app/core/lib/helpers'

interface UpcomingAppointmentProps {
  patientId: number
}

export const PatientContactList = ({ patientId }: UpcomingAppointmentProps) => {
  const [patientContacts] = useQuery(getPatientContacts, { patientId })

  return (
    <SidebarCard title="Contacts">
      {patientContacts.map(
        (patientContact) =>
          patientContact.contactType !== 'PATIENT' && (
            <p className="flex justify-between text-sm text-gray-500 mb-1" key={patientContact.id}>
              <Link href={Routes.ShowContactPage({ contactId: patientContact.contactId })}>
                <a className="text-blue-600 hover:underline mr-2">
                  {patientContact.contact?.firstName} {patientContact.contact?.lastName}
                </a>
              </Link>
              <p className="capitalize">{humanizeEnum(patientContact.contactType)}</p>
            </p>
          )
      )}
    </SidebarCard>
  )
}
