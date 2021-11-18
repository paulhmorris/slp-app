import { FORM_ERROR, ServiceForm } from 'app/patient-services/components/ServiceForm'
import updateService from 'app/patient-services/mutations/updateService'
import getService from 'app/patient-services/queries/getService'
import { BlitzPage, Head, Link, Routes, useMutation, useParam, useQuery, useRouter } from 'blitz'
import { Suspense } from 'react'

export const EditService = () => {
  const router = useRouter()
  const serviceId = useParam('serviceId', 'number')
  const [service, { setQueryData }] = useQuery(
    getService,
    { id: serviceId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateServiceMutation] = useMutation(updateService)

  return (
    <>
      <Head>
        <title>Edit Service {service.id}</title>
      </Head>

      <div>
        <h1>Edit Service {service.id}</h1>
        <pre>{JSON.stringify(service, null, 2)}</pre>

        <ServiceForm
          submitText="Update Service"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateService}
          initialValues={service}
          onSubmit={async (values) => {
            try {
              const updated = await updateServiceMutation({
                id: service.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowServicePage({ serviceId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditServicePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditService />
      </Suspense>

      <p>
        <Link href={Routes.ServicesPage()}>
          <a>Services</a>
        </Link>
      </p>
    </div>
  )
}

EditServicePage.authenticate = true
EditServicePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default EditServicePage
