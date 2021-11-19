import { Toast } from 'app/core/components/Toast'
import PatientLayout from 'app/core/layouts/PatientLayout'
import { FORM_ERROR, PatientForm } from 'app/patients/components/forms/PatientSettings'
import updatePatientSettings from 'app/patients/mutations/updatePatientSettings'
import getPatient from 'app/patients/queries/getPatient'
import {
  BlitzPage,
  Head,
  invalidateQuery,
  NotFoundError,
  useMutation,
  useParam,
  useQuery,
} from 'blitz'
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

export const PatientSettings = () => {
  const patientId = useParam('patientId', 'number')
  const [patient] = useQuery(getPatient, { id: patientId }, { staleTime: Infinity })
  const [updateSettingsMutation] = useMutation(updatePatientSettings, {
    onSuccess: () => handleUpdate({ isSuccess: true }),
    onError: () => handleUpdate({ isSuccess: false }),
  })

  const contact = patient.patientRelations[0]?.contact
  if (!contact) {
    throw new NotFoundError('No Patient Contact information was found')
  }

  const settingsFormValues = {
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    dateOfBirth: contact.dateOfBirth,
    isMinor: patient.patientRelations[0]?.isMinor,
    isActive: patient.isActive,
    phones: contact.phones,
    address: {
      ...contact.address,
    },
  }

  const handleSubmit = async (values) => {
    try {
      const updated = await updateSettingsMutation({
        id: contact.id,
        ...values,
      })
      invalidateQuery(getPatient)
    } catch (error: any) {
      console.error(error)
      return {
        [FORM_ERROR]: error.toString(),
      }
    }
  }

  return (
    <>
      <Head>
        <title>
          Settings for {contact.firstName.substring(0, 1)}
          {contact.lastName.substring(0, 1)}
        </title>
      </Head>
      <PatientForm
        submitText={'Save Settings'}
        onSubmit={handleSubmit}
        initialValues={settingsFormValues}
      />
    </>
  )
}

const PatientSettingsPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PatientSettings />
      </Suspense>
    </div>
  )
}

PatientSettingsPage.getLayout = (page) => <PatientLayout>{page}</PatientLayout>

export default PatientSettingsPage
