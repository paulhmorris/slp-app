import Layout from 'app/core/layouts/Layout'
import deletePatientRelation from 'app/patient-contacts/mutations/deletePatientRelation'
import getPatientRelation from 'app/patient-contacts/queries/getPatientRelation'
import { BlitzPage, Head, Link, Routes, useMutation, useParam, useQuery, useRouter } from 'blitz'
import { Suspense } from 'react'

export const PatientRelation = () => {
  const router = useRouter()
  const patientRelationId = useParam('patientRelationId', 'number')
  const [deletePatientRelationMutation] = useMutation(deletePatientRelation)
  const [patientRelation] = useQuery(getPatientRelation, { id: patientRelationId })

  return (
    <>
      <Head>
        <title>PatientRelation {patientRelation.id}</title>
      </Head>

      <div>
        <h1>PatientRelation {patientRelation.id}</h1>
        <pre>{JSON.stringify(patientRelation, null, 2)}</pre>

        <Link href={Routes.EditPatientRelationPage({ patientRelationId: patientRelation.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm('This will be deleted')) {
              await deletePatientRelationMutation({ id: patientRelation.id })
              router.push(Routes.PatientRelationsPage())
            }
          }}
          style={{ marginLeft: '0.5rem' }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowPatientRelationPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.PatientRelationsPage()}>
          <a>PatientRelations</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <PatientRelation />
      </Suspense>
    </div>
  )
}

ShowPatientRelationPage.authenticate = true
ShowPatientRelationPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPatientRelationPage
