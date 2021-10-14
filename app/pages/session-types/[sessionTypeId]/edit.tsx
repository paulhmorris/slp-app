import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSessionType from "app/session-types/queries/getSessionType"
import updateSessionType from "app/session-types/mutations/updateSessionType"
import { SessionTypeForm, FORM_ERROR } from "app/session-types/components/SessionTypeForm"

export const EditSessionType = () => {
  const router = useRouter()
  const sessionTypeId = useParam("sessionTypeId", "number")
  const [sessionType, { setQueryData }] = useQuery(
    getSessionType,
    { id: sessionTypeId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateSessionTypeMutation] = useMutation(updateSessionType)

  return (
    <>
      <Head>
        <title>Edit SessionType {sessionType.id}</title>
      </Head>

      <div>
        <h1>Edit SessionType {sessionType.id}</h1>
        <pre>{JSON.stringify(sessionType, null, 2)}</pre>

        <SessionTypeForm
          submitText="Update SessionType"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateSessionType}
          initialValues={sessionType}
          onSubmit={async (values) => {
            try {
              const updated = await updateSessionTypeMutation({
                id: sessionType.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowSessionTypePage({ sessionTypeId: updated.id }))
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

const EditSessionTypePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditSessionType />
      </Suspense>

      <p>
        <Link href={Routes.SessionTypesPage()}>
          <a>SessionTypes</a>
        </Link>
      </p>
    </div>
  )
}

EditSessionTypePage.authenticate = true
EditSessionTypePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditSessionTypePage
