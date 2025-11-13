import type { ReactNode } from 'react'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import LocaleToggle from '@/widgets/locale-toggle'
import ThemeToggle from '@/widgets/theme-toggle'
import Footer from './Footer'

const UnderlineLink = ({
  link,
  label,
  underlineByDefault = false,
}: {
  label: ReactNode | string
  link: string
  underlineByDefault?: boolean
}) => {
  return (
    <Link
      href={link}
      target="_blank"
      className={cn(
        'flex items-center rounded-none border border-transparent',
        'dark:text-zinc-300',
        'duration-200',
        'hover:border-b-zinc-600',
        'dark:hover:border-b-zinc-300',
        underlineByDefault
          ? `border-b border-b-zinc-400/[0.3] dark:border-b-zinc-500`
          : 'hover:border-b',
      )}
    >
      { label }
    </Link>
  )
}

export function CustomFooter() {
  return (
    <Footer />
  )
}
