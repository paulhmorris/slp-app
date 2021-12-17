import getAppointments from 'app/appointments/queries/getAppointments'
import AdminLayout from 'app/core/layouts/AdminLayout'
import { BlitzPage, Head, Link, Routes, usePaginatedQuery, useRouter } from 'blitz'
import dayjs from 'dayjs'

const ITEMS_PER_PAGE = 100

export const AppointmentsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ appointments, hasMore }] = usePaginatedQuery(getAppointments, {
    orderBy: { scheduledAt: 'desc' },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Patient
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Scheduled For
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Duration
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">View Session</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment, appointmentIdx) => (
                    <tr
                      key={appointment.id}
                      className={appointmentIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                        {appointment.id}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                        {appointment.patient.patientRelations[0]?.contact?.firstName}{' '}
                        {appointment.patient.patientRelations[0]?.contact?.lastName}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dayjs(appointment.scheduledAt).format('MM/DD/YYYY h:mm a')}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.duration && appointment.duration}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={Routes.ShowAppointmentPage({ appointmentId: appointment.id })}>
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            View
                          </a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button
          className="mr-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
          disabled={page === 0}
          onClick={goToPreviousPage}
        >
          Previous
        </button>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={!hasMore}
          onClick={goToNextPage}
        >
          Next
        </button>
      </div>
    </>
  )
}

const AppointmentsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Appointments</title>
      </Head>

      <div>
        <h1 className="mb-3">Appointments</h1>

        <AppointmentsList />
      </div>
    </>
  )
}

AppointmentsPage.authenticate = true
AppointmentsPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AppointmentsPage
