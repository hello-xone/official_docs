'use client'
// pages/_app.tsx
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import '@nextui-org/react/compiled.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}
