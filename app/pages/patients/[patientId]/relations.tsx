import { FORM_ERROR } from 'app/appointments/components/AppointmentForm'
import { Toast } from 'app/core/components/Toast'
import PatientLayout from 'app/core/layouts/PatientLayout'
import { formatPhoneNumber, humanizeEnum } from 'app/core/lib/helpers'
import updatePatientRelation from 'app/patient-contacts/mutations/updatePatientRelation'
import getPatientRelations from 'app/patient-contacts/queries/getPatientRelations'
import { BlitzPage, invalidateQuery, useMutation, useParam, useQuery } from 'blitz'
import { Suspense } from 'react'
import toast from 'react-hot-toast'

const handleUpdate = async ({ isSuccess }) => {
  toast.custom(
    (t) => (
      <Toast
        show={t.visible}
        type={isSuccess ? 'success' : 'error'}
        title={isSuccess ? 'Success!' : 'Whoops! Something went wrong'}
        message={isSuccess ? 'Patient settings have been saved' : "We couldn't save your changes"}
      />
    ),
    isSuccess && { duration: 3000 }
  )
}

export const PatientRelationsDetails = () => {
  const patientId = useParam('patientId', 'number')!
  const [patientRelations] = useQuery(getPatientRelations, { patientId })
  const [updateRelation] = useMutation(updatePatientRelation, {
    onSuccess: () => handleUpdate({ isSuccess: true }),
    onError: () => handleUpdate({ isSuccess: false }),
  })

  const handleSubmit = async ({ relationId }, values) => {
    try {
      const updated = await updateRelation({
        id: relationId,
        ...values,
      })
      invalidateQuery(getPatientRelations)
    } catch (error: any) {
      console.error(error)
      return {
        [FORM_ERROR]: error.toString(),
      }
    }
  }

  return (
    <div className="space-y-4">
      {patientRelations.map((relation) => (
        <div key={relation.id} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-6 py-5  border-b border-gray-200">
            <h2 className="text-base font-medium">
              {relation.contact?.firstName} {relation.contact?.lastName}
            </h2>
          </div>
          <div className="px-6 pb-2 pt-4">
            <div className="py-3 flex justify-between font-medium max-w-sm">
              <dt className="text-gray-500">Relation Type</dt>
              <dd className="text-gray-900 capitalize">{humanizeEnum(relation.relationType)}</dd>
            </div>
          </div>
          <div className="px-6 pb-2">
            <div className="py-3 flex justify-between font-medium max-w-sm">
              <dt className="text-gray-500">Phone</dt>
              <dd className="text-gray-900 capitalize">
                {formatPhoneNumber(relation.contact?.phones[0]?.number)}
              </dd>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const PatientRelationsDetailsPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PatientRelationsDetails />
      </Suspense>
    </div>
  )
}

PatientRelationsDetailsPage.getLayout = (page) => <PatientLayout>{page}</PatientLayout>

export default PatientRelationsDetailsPage
