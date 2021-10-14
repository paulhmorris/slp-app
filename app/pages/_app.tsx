import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from "blitz"
import LoginForm from "app/auth/components/LoginForm"
import "app/core/styles/index.css"
import Navbar from "app/core/components/Navbar"
import { Suspense, useState } from "react"
import { BeatLoader } from "react-spinners"
import { css } from "@emotion/react"

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  let [loading, setLoading] = useState(true)
  let [color, setColor] = useState("#ffffff")

  const loader = css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      onReset={useQueryErrorResetBoundary().reset}
    >
      <Navbar />
      <Suspense fallback={<BeatLoader color="#818CF8" css={loader} size={30} />}>
        <div className="px-6 py-4 max-w-7xl mx-auto">{getLayout(<Component {...pageProps} />)}</div>
      </Suspense>
    </ErrorBoundary>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
