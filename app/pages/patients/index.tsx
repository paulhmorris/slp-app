import AdminLayout from 'app/core/layouts/AdminLayout'
import { formatPhoneNumber } from 'app/core/lib/helpers'
import getPatients from 'app/patients/queries/getPatients'
import { BlitzPage, Head, Link, Routes, usePaginatedQuery, useRouter } from 'blitz'
import { Suspense, useState } from 'react'

const ITEMS_PER_PAGE = 100

export const PatientsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [sorter, setSorter] = useState({ id: 'asc' })

  const [{ patients, hasMore }] = usePaginatedQuery(getPatients, {
    orderBy: { ...sorter },
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
                    {/* <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Id
                    </th> */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, patientIdx) => (
                    <tr
                      key={patient.id}
                      className={patientIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {patient.id}
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                        <Link href={Routes.ShowPatientPage({ patientId: patient.id })}>
                          <a className="text-indigo-700 hover:underline">
                            {patient.patientRelations[0]?.contact?.firstName}{' '}
                            {patient.patientRelations[0]?.contact?.lastName}
                          </a>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient.patientRelations[0]?.contact?.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatPhoneNumber(patient.patientRelations[0]?.contact?.phones[0]?.number)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`${
                            patient.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          } text-white inline-flex px-3 py-1 rounded-full text-xs leading-5 font-semibold align-middle`}
                        >
                          {patient.isActive ? 'Active' : 'Inactive'}
                        </span>
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

const PatientsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Patients</title>
      </Head>

      <Suspense fallback={<div>Loading...</div>}>
        <PatientsList />
      </Suspense>
    </>
  )
}

PatientsPage.authenticate = true
PatientsPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default PatientsPage
