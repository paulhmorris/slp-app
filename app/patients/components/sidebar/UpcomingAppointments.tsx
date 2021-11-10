import { useQuery, Link, Routes } from 'blitz'
import dayjs from 'dayjs'
import getUpcomingAppointments from '../../queries/getUpcomingAppointments'
import { SidebarCard } from './SidebarCard'

interface UpcomingAppointmentProps {
  patientId: number
}

export const UpcomingAppointments = ({ patientId }: UpcomingAppointmentProps) => {
  const [appointments] = useQuery(getUpcomingAppointments, { patientId })

  return (
    <SidebarCard title="upcoming appointments">
      {appointments.map((appointment) => (
        <p className="text-sm text-gray-500 mb-1" key={appointment.id}>
          <Link href={Routes.ShowAppointmentPage({ appointmentId: appointment.id })}>
            <a className="text-indigo-600 hover:underline mr-2">
              {dayjs(appointment.scheduledAt).format('MM/DD/YY')}
            </a>
          </Link>
          <span>{dayjs(appointment.scheduledAt).format('h:mm a')}</span>
        </p>
      ))}
    </SidebarCard>
  )
}
