import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPatients from "app/patients/queries/getPatients"

const ITEMS_PER_PAGE = 100

export const PatientsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ patients, hasMore }] = usePaginatedQuery(getPatients, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            <Link href={Routes.ShowPatientPage({ patientId: patient.id })}>
              <a>
                {patient.firstName} {patient.lastName}: {patient.email}
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const PatientsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Patients</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewPatientPage()}>
            <a className="py-2 px-4 rounded-sm bg-indigo-500 text-white text-md ">Create Patient</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PatientsList />
        </Suspense>
      </div>
    </>
  )
}

PatientsPage.authenticate = true
PatientsPage.getLayout = (page) => <Layout>{page}</Layout>

export default PatientsPage
