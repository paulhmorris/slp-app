import { formatPhoneNumber, humanizeEnum } from 'app/core/lib/helpers'
import getPatientRelations from 'app/patient-contacts/queries/getPatientRelations'
import { Link, Routes, useQuery } from 'blitz'
import { SidebarCard } from './SidebarCard'

interface UpcomingAppointmentProps {
  patientId: number
}

export const PatientRelationList = ({ patientId }: UpcomingAppointmentProps) => {
  const [patientRelations] = useQuery(getPatientRelations, { patientId })

  return (
    <SidebarCard title="Contacts" action="Edit">
      {patientRelations.map(
        ({ id, relationType, contactId, contact }) =>
          relationType !== 'PATIENT' && (
            <div key={id} className="mb-4">
              <div className="flex text-sm text-gray-500 mb-2" key={id}>
                <Link href={Routes.ShowContactPage({ contactId })}>
                  <a className="text-indigo-700 hover:underline mr-2">
                    {contact?.firstName} {contact?.lastName}
                  </a>
                </Link>
                <p className="capitalize">{humanizeEnum(relationType)}</p>
              </div>
              {/* Phone */}
              {/* TODO: contact?.phones.length && is rendering a "0"?? */}
              {contact?.phones.length ? (
                <div className="flex justify-start mb-2">
                  <div className="flex justify-start w-1/4">
                    <label id="phoneLabel" className="text-gray-500 text-sm">
                      Phone
                    </label>
                  </div>
                  <div className="w-3/4 text-sm text-gray-500">
                    {contact?.phones.map((phone, phoneIdx) => (
                      <div key={phoneIdx}>
                        <a
                          className="block text-indigo-700 hover:underline"
                          href={`tel:${phone.number}`}
                          aria-describedby="phoneLabel"
                        >
                          {formatPhoneNumber(phone.number)}
                        </a>
                        <p className="capitalize text-gray-800">{humanizeEnum(phone.phoneType)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )}
              {/* Email */}
              {contact?.email && (
                <div className="flex justify-start">
                  <div className="flex justify-start w-1/4">
                    <label id="phoneLabel" className="text-gray-500 text-sm">
                      Email
                    </label>
                  </div>
                  <div className="w-3/4 text-sm text-gray-500">
                    <a
                      className="block text-indigo-700 hover:underline"
                      href={`mailTo:${contact?.email}`}
                      key={contact?.id}
                      aria-describedby="phoneLabel"
                    >
                      {contact?.email}
                    </a>
                  </div>
                </div>
              )}
            </div>
          )
      )}
    </SidebarCard>
  )
}
