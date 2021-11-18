import { FORM_ERROR, NoteForm } from 'app/notes/components/NoteForm'
import updateNote from 'app/notes/mutations/updateNote'
import getNote from 'app/notes/queries/getNote'
import { BlitzPage, Head, Link, Routes, useMutation, useParam, useQuery, useRouter } from 'blitz'
import { Suspense } from 'react'

export const EditNote = () => {
  const router = useRouter()
  const noteId = useParam('noteId', 'number')
  const [note, { setQueryData }] = useQuery(
    getNote,
    { id: noteId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateNoteMutation] = useMutation(updateNote)

  return (
    <>
      <Head>
        <title>Edit Note {note.id}</title>
      </Head>

      <div>
        <h1>Edit Note {note.id}</h1>
        <pre>{JSON.stringify(note, null, 2)}</pre>

        <NoteForm
          submitText="Update Note"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateNote}
          initialValues={note}
          onSubmit={async (values) => {
            try {
              const updated = await updateNoteMutation({
                id: note.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowNotePage({ noteId: updated.id }))
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

const EditNotePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditNote />
      </Suspense>

      <p>
        <Link href={Routes.NotesPage()}>
          <a>Notes</a>
        </Link>
      </p>
    </div>
  )
}

EditNotePage.authenticate = true
EditNotePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default EditNotePage
