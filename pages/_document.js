import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.1.1/css/all.css"
        />
      </Head>
      <body className="bg-site">
        <div id={'globalLoader'} className="face">
          <div className="loader">
            <img src='/images/Logo-removebg-preview.png' width={200} height={200} alt="Logo"></img>
            <div />
          </div>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
