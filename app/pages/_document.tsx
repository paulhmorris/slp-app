import { BlitzScript /*DocumentContext*/, Document, DocumentHead, Html, Main } from 'blitz'

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }

  render() {
    return (
      <Html lang="en">
        <DocumentHead>
          <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
          {/* {process.env.NODE_ENV === 'development' && (
            <script src="https://cdn-tailwindcss.vercel.app"></script>
          )} */}
        </DocumentHead>
        <body>
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
