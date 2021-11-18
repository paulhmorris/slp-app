import { BlitzLayout, Head } from 'blitz'
import Navbar from '../components/Navbar'

const AdminLayout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || 'slp-app'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar>{children}</Navbar>
    </>
  )
}

AdminLayout.authenticate = true

export default AdminLayout
