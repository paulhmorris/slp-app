import Layout from 'app/core/layouts/Layout'
import { FORM_ERROR, ServiceForm } from 'app/patient-services/components/ServiceForm'
import createService from 'app/patient-services/mutations/createService'
import { BlitzPage, Link, Routes, useMutation, useRouter } from 'blitz'

const NewServicePage: BlitzPage = () => {
  const router = useRouter()
  const [createServiceMutation] = useMutation(createService)

  return (
    <div>
      <h1>Create New Service</h1>

      <ServiceForm
        submitText="Create Service"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateService}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const service = await createServiceMutation(values)
            router.push(Routes.ShowServicePage({ serviceId: service.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.ServicesPage()}>
          <a>Services</a>
        </Link>
      </p>
    </div>
  )
}

NewServicePage.authenticate = true
NewServicePage.getLayout = (page) => <Layout title={'Create New Service'}>{page}</Layout>

export default NewServicePage
