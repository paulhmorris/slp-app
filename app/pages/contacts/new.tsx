import { ContactForm, FORM_ERROR } from 'app/contacts/components/ContactForm'
import createContact from 'app/contacts/mutations/createContact'
import AdminLayout from 'app/core/layouts/AdminLayout'
import { BlitzPage, Link, Routes, useMutation, useRouter } from 'blitz'

const NewContactPage: BlitzPage = () => {
  const router = useRouter()
  const [createContactMutation] = useMutation(createContact)

  return (
    <div>
      <h1>Create New Contact</h1>

      <ContactForm
        submitText="Create Contact"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateContact}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const contact = await createContactMutation(values)
            router.push(Routes.ShowContactPage({ contactId: contact.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.ContactsPage()}>
          <a>Contacts</a>
        </Link>
      </p>
    </div>
  )
}

NewContactPage.authenticate = true
NewContactPage.getLayout = (page) => <AdminLayout title={'Create New Contact'}>{page}</AdminLayout>

export default NewContactPage
