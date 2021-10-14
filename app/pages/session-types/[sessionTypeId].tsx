import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSessionType from "app/session-types/queries/getSessionType"
import deleteSessionType from "app/session-types/mutations/deleteSessionType"

export const SessionType = () => {
  const router = useRouter()
  const sessionTypeId = useParam("sessionTypeId", "number")
  const [deleteSessionTypeMutation] = useMutation(deleteSessionType)
  const [sessionType] = useQuery(getSessionType, { id: sessionTypeId })

  return (
    <>
      <Head>
        <title>SessionType {sessionType.id}</title>
      </Head>

      <div>
        <h1>SessionType {sessionType.id}</h1>
        <pre>{JSON.stringify(sessionType, null, 2)}</pre>

        <Link href={Routes.EditSessionTypePage({ sessionTypeId: sessionType.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteSessionTypeMutation({ id: sessionType.id })
              router.push(Routes.SessionTypesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowSessionTypePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.SessionTypesPage()}>
          <a>SessionTypes</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <SessionType />
      </Suspense>
    </div>
  )
}

ShowSessionTypePage.authenticate = true
ShowSessionTypePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowSessionTypePage
