import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head >
      <meta property="og:title" content="QP" />
          <meta property="og:description" content="Social Media" />
          <meta property="og:image" content="https://qp-new.vercel.app/logo.png" />
          <meta property="og:url" content="https://qp-new.vercel.app" />
          <meta property="og:type" content="website" />
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
