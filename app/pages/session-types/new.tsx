import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createSessionType from "app/session-types/mutations/createSessionType"
import { SessionTypeForm, FORM_ERROR } from "app/session-types/components/SessionTypeForm"

const NewSessionTypePage: BlitzPage = () => {
  const router = useRouter()
  const [createSessionTypeMutation] = useMutation(createSessionType)

  return (
    <div>
      <h1>Create New SessionType</h1>

      <SessionTypeForm
        submitText="Create SessionType"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateSessionType}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const sessionType = await createSessionTypeMutation(values)
            router.push(Routes.ShowSessionTypePage({ sessionTypeId: sessionType.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.SessionTypesPage()}>
          <a>SessionTypes</a>
        </Link>
      </p>
    </div>
  )
}

NewSessionTypePage.authenticate = true
NewSessionTypePage.getLayout = (page) => <Layout title={"Create New SessionType"}>{page}</Layout>

export default NewSessionTypePage
