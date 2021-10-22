import { css } from '@emotion/react'
import LoginForm from 'app/auth/components/LoginForm'
import Navbar from 'app/core/components/Navbar'
import 'app/core/styles/index.css'
import {
  AppProps,
  AuthenticationError,
  AuthorizationError,
  ErrorBoundary,
  ErrorComponent,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from 'blitz'
import { Suspense } from 'react'
import { BeatLoader } from 'react-spinners'

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

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
      <Suspense fallback={<BeatLoader color="#818CF8" css={loader} size={30} />}>
        <Navbar />
        <div className="px-6 pt-4 pb-20 max-w-7xl mx-auto min-h-full">
          {getLayout(<Component {...pageProps} />)}
        </div>
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
