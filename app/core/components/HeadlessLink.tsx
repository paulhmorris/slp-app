import { Link } from 'blitz'

export const HeadlessLink = ({ href, children, ...rest }) => {
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  )
}
