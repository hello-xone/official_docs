// pages/_app.tsx
import Providers from '@components/providers';
import { createTheme, MantineProvider } from "@mantine/core";
import { theme } from "@/theme";
import { AppProps } from 'next/app';
import { Inter } from "next/font/google";
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import SEO from 'src/next-seo.config';
import '@/styles/globals.css';
import SidebarDevelopersHide from '@/components/SidebarDevelopersHide';
import { SpeedInsights } from '@vercel/speed-insights/next';
import * as React from "react";
import { ensureI18nInitialized } from '@/i18n';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isClientReady, setIsClientReady] = React.useState(false);
  
  React.useEffect(() => {
    // Initialize i18n and set flag when ready
    const initialLanguage = router.locale ?? 'en';
    ensureI18nInitialized(initialLanguage);
    setIsClientReady(true);
  }, [router.locale]);
  
  // For server-side rendering, return a minimal shell
  if (typeof window === 'undefined') {
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
      </>
    );
  }
  
  // For client-side, wait until i18n is initialized before rendering
  if (!isClientReady) {
    return null; // or a loading state
  }
  
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
          <SpeedInsights />
          <SidebarDevelopersHide />
        </Providers>

      </MantineProvider>
    </>
  );
}
