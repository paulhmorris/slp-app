import Layout from 'app/core/layouts/Layout'
import { getTagStyles } from 'app/core/lib/helpers'
import getPatientSessions from 'app/patient-sessions/queries/getPatientSessions'
import { BlitzPage, Head, Link, Routes, usePaginatedQuery, useRouter } from 'blitz'
import dayjs from 'dayjs'

const ITEMS_PER_PAGE = 100

export const PatientSessionsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ patientSessions, hasMore }] = usePaginatedQuery(getPatientSessions, {
    orderBy: { createdAt: 'desc' },
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
                      Created At
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
                      Status
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
                  {patientSessions.map((session, sessionIdx) => (
                    <tr
                      key={session.id}
                      className={sessionIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                        {session.id}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                        {session.patient.firstName} {session.patient.lastName}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dayjs(session.createdAt).format('MM/DD/YYYY h:mm a')}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {session.type.name}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`tag-lg ${getTagStyles(session.status.name)}`}>
                          {session.status.name}
                          {session.status.id === 2 && (
                            <span className="flex absolute h-2.5 w-2.5 top-0 right-0 -mt-1 -mr-1">
                              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-70"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                          )}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {session.duration && session.duration}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={Routes.ShowPatientSessionPage({ patientSessionId: session.id })}
                        >
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

const PatientSessionsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>PatientSessions</title>
      </Head>

      <div>
        <h1 className="mb-3">Sessions</h1>

        <PatientSessionsList />
      </div>
    </>
  )
}

PatientSessionsPage.authenticate = true
PatientSessionsPage.getLayout = (page) => <Layout>{page}</Layout>

export default PatientSessionsPage
