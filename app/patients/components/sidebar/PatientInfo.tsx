import { formatPhoneNumber, humanizeEnum } from 'app/core/lib/helpers'
import { Contact, Phone } from 'db'
import { SidebarCard } from './SidebarCard'

interface IPatientInfo {
  contact: Contact & {
    phones: Phone[]
  }
}

export const PatientInfo = ({ contact }: IPatientInfo) => {
  return (
    <SidebarCard title="Patient Info">
      <div className="flex justify-start mb-2">
        <div className="flex justify-start w-1/4">
          <label id="phoneLabel" className="text-gray-500 text-sm">
            Phone
          </label>
        </div>
        <div className="w-3/4 text-sm text-gray-500">
          {contact?.phones.map((phone, phoneIdx) => (
            <>
              <a
                className="block text-indigo-700 hover:underline"
                href={`tel:${phone.number}`}
                key={phoneIdx}
                aria-describedby="phoneLabel"
              >
                {formatPhoneNumber(phone.number)}
              </a>
              <p className="capitalize text-gray-700">{humanizeEnum(phone.phoneType)}</p>
            </>
          ))}
        </div>
      </div>
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
    </SidebarCard>
  )
}
