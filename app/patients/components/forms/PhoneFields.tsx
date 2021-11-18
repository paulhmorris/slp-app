import { PlusSmIcon, TrashIcon } from '@heroicons/react/outline'
import LabeledCheckbox from 'app/core/components/Forms/LabeledCheckbox'
import LabeledSelect from 'app/core/components/Forms/LabeledSelect'
import LabeledTextField from 'app/core/components/Forms/LabeledTextField'
import { Modal } from 'app/core/components/Modal'
import { Toast } from 'app/core/components/Toast'
import { formatPhoneNumber, humanizeEnum } from 'app/core/lib/helpers'
import getPatient from 'app/patients/queries/getPatient'
import deletePhone from 'app/phones/mutations/deletePhone'
import { Phone, PhoneType } from 'db'
import { invalidateQuery, useMutation } from 'next/data-client'
import React, { Fragment, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface IPhoneFields {
  phones: Phone[] | undefined
}

const phoneTypeOptions: { value: string; text: string }[] = []
for (const [key, value] of Object.entries(PhoneType)) {
  const type = {
    value: key,
    text: humanizeEnum(key),
  }
  phoneTypeOptions.push(type)
}

export const PhoneFields = ({ phones }: IPhoneFields) => {
  const [newPhoneCount, setNewPhoneCount] = useState(0)
  const phonesCount = phones?.length

  useEffect(() => {
    setNewPhoneCount(0)
  }, [phones])

  return (
    <>
      {phones &&
        phones.map(({ id, number }, phoneIdx) => (
          <Fragment key={number}>
            <div className="flex flex-col space-y-3 col-span-3">
              <div className="flex items-center space-x-4">
                <LabeledTextField
                  label="Phone number"
                  name={`phones[${phoneIdx}].number`}
                  isPhoneNumber={true}
                  type="text"
                  required
                />
                <LabeledSelect
                  name={`phones[${phoneIdx}].phoneType`}
                  label="Type"
                  options={phoneTypeOptions}
                  required
                />
                <div className="inline-flex h-full">
                  <DeletePhone id={id} number={number} />
                </div>
              </div>
              <div className="col-span-3 space-x-16">
                <LabeledCheckbox
                  name={`phones[${phoneIdx}].allowCalls`}
                  label="Voice Calls Ok"
                  span="col-span-1"
                />
                <LabeledCheckbox
                  name={`phones[${phoneIdx}].allowTexts`}
                  label="Text Messages Ok"
                  span="col-span-1"
                />
              </div>
            </div>
          </Fragment>
        ))}
      {[...Array(newPhoneCount)].map((p, i) => (
        <CreatePhone key={`create-${i}`} index={i + (phonesCount || 0)} />
      ))}
      <div>
        <button
          type="button"
          className="btn-white"
          onClick={() => setNewPhoneCount(newPhoneCount + 1)}
        >
          <PlusSmIcon className="h-5 w-5 mr-2" /> Add New
        </button>
      </div>
    </>
  )
}

const DeletePhone = ({ id, number }) => {
  const [showModal, setShowModal] = useState(false)
  const [deletePhoneMutation, { isLoading }] = useMutation(deletePhone, {
    onSuccess: () => handleUpdate({ isSuccess: true }),
    onError: () => handleUpdate({ isSuccess: false }),
  })

  const handleUpdate = async ({ isSuccess }) => {
    toast.custom(
      (t) => (
        <Toast
          show={t.visible}
          type={isSuccess ? 'success' : 'error'}
          title={isSuccess ? 'Success!' : 'Whoops! Something went wrong'}
          message={
            isSuccess ? 'Patient phone number was deleted' : "We couldn't delete that phone number"
          }
        />
      ),
      isSuccess && { duration: 3000 }
    )
  }

  const handleDelete = async () => {
    setShowModal(false)
    await deletePhoneMutation({ id })
    invalidateQuery(getPatient)
  }

  return (
    <>
      <button type="button" aria-label="Delete phone" onClick={() => setShowModal(true)}>
        <TrashIcon className="h-6 w-6 hover:text-red-600 text-gray-400 transition-colors mt-5" />
      </button>
      <Modal
        type="warning"
        title={`Delete Phone ${formatPhoneNumber(number)}`}
        description="Are you sure you want to delete this phone number? This action cannot be undone. If you just want to disable voice or text reminders, try using the checkboxes below."
        confirmText="delete phone"
        isLoading={isLoading}
        showModal={showModal}
        setShowModal={setShowModal}
        callback={handleDelete}
      />
    </>
  )
}

const CreatePhone = ({ index }) => {
  return (
    <div className="flex flex-col space-y-3 col-span-3">
      <div className="flex items-center space-x-4">
        <LabeledTextField
          label="Phone number"
          name={`phones[${index}].number`}
          isPhoneNumber={true}
          type="text"
          required
        />
        <LabeledSelect
          initialValue="MOBILE"
          name={`phones[${index}].phoneType`}
          label="Type"
          options={phoneTypeOptions}
          required
        />
      </div>
      <div className="col-span-3 space-x-16">
        <LabeledCheckbox
          initialValue={false}
          name={`phones[${index}].allowCalls`}
          label="Voice Calls Ok"
          span="col-span-1"
        />
        <LabeledCheckbox
          initialValue={false}
          name={`phones[${index}].allowTexts`}
          label="Text Messages Ok"
          span="col-span-1"
        />
      </div>
    </div>
  )
}
