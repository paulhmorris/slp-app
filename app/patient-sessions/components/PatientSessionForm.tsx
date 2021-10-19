import { Form, FormProps } from 'app/core/components/Form'
import getPatients from 'app/patients/queries/getPatients'
import getSessionTypes from 'app/session-types/queries/getSessionTypes'
import { useQuery } from 'blitz'
import React from 'react'
import { Field } from 'react-final-form'
import { z } from 'zod'
export { FORM_ERROR } from 'app/core/components/Form'

export function PatientSessionForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <div className=" mt-6 space-y-3">
        <PatientSelect patient={props.initialValues?.patientId} />
        <SessionTypeSelect sessionType={props.initialValues?.sessionTypeId} />
        {/* 1. Add note editor here, but make sure it's using a react-final-form field */}
      </div>
    </Form>
  )
}

export function PatientSelect(props) {
  const [{ patients }] = useQuery(getPatients, {
    where: { isActive: true },
    orderBy: { id: 'asc' },
  })

  return (
    <div>
      <label htmlFor="patient" className="block text-sm font-medium text-gray-700">
        Select Patient
      </label>
      <Field
        id="patient"
        name="patientId"
        component="select"
        value={props.patient}
        parse={(value) => value && Number(value)}
        className="mt-1 block w-64 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="" disabled>
          Select from dropdown
        </option>
        {patients.map((patient) => (
          <option key={patient.id} value={patient.id}>
            {patient.firstName} {patient.lastName}
          </option>
        ))}
      </Field>
    </div>
  )
}

export function SessionTypeSelect(props) {
  const [{ sessionTypes }] = useQuery(getSessionTypes, {
    orderBy: { id: 'asc' },
  })

  return (
    <div>
      <label htmlFor="type" className="block text-sm font-medium text-gray-700">
        Select Session Type
      </label>
      <Field
        id="type"
        name="typeId"
        component="select"
        value={props.sessionType}
        parse={(value) => value && Number(value)}
        className="mt-1 block w-64 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="" disabled>
          Select from dropdown
        </option>
        {sessionTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </Field>
    </div>
  )
}
