import { NextUIProvider } from "@nextui-org/react";
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from "next/font/google";
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import SEO from 'src/next-seo.config';

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <DefaultSeo {...SEO} />
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </>
  );
}


