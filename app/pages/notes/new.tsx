import { FORM_ERROR, NoteForm } from 'app/notes/components/NoteForm'
import createNote from 'app/notes/mutations/createNote'
import { BlitzPage, Link, Routes, useMutation, useRouter } from 'blitz'

const NewNotePage: BlitzPage = () => {
  const router = useRouter()
  const [createNoteMutation] = useMutation(createNote)

  return (
    <div>
      <NoteForm
        submitText="+ Add Note"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateNote}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const note = await createNoteMutation(values)
            router.push(Routes.ShowNotePage({ noteId: note.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.NotesPage()}>
          <a>Notes</a>
        </Link>
      </p>
    </div>
  )
}

NewNotePage.authenticate = true
NewNotePage.getLayout = (page) => <AdminLayout title={'Create New Note'}>{page}</AdminLayout>

export default NewNotePage
