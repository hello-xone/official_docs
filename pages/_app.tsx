// pages/_app.tsx
import Providers from '@components/providers';
import { createTheme, MantineProvider } from "@mantine/core";
import { theme } from "@/theme";
import * as React from "react";
import { AppProps } from 'next/app';
import { Inter } from "next/font/google";
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import SEO from 'src/next-seo.config';
import '@/styles/globals.css';

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
      
      <MantineProvider theme={theme}>

        <Providers>
          <Component {...pageProps} />
        </Providers>

      </MantineProvider>
    </>
  );
}
