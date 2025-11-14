'use client'

import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import * as React from 'react'

export function NextUIProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  return (
    <NextUIProvider navigate={router.push}>
      {children}
    </NextUIProvider>
  )
}
