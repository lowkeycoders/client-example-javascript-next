import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  // Get the base path from environment variable
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  return (
    <Html lang="en">
      <Head>
        {/* This ensures that all assets are loaded with the correct base path */}
        <base href={`${basePath}/`} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
