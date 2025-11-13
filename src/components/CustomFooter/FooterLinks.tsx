'use client'

import type { FooterGroup, FooterLink } from '@/lib/links'
import { Link as HLink } from '@heroui/react'
import NextLink from 'next/link'

interface Props { group: FooterGroup, className?: string }

function LinkItem(l: FooterLink, key: number) {
  if (l.later) {
    return (
      <div key={key} className="flex gap-2 items-center text-default-600">
        <span className="text-sm">{l.name}</span>
        <span className="text-[12px] rounded-full border border-[#ff04204d] px-2 py-0.5 text-[#FF0420]">
          Later
        </span>
      </div>
    )
  }

  const cls = 'text-sm text-default-600 hover:text-foreground transition'
  if (l.internal) {
    return (
      <HLink key={key} as={NextLink} href={l.url} className={cls} rel="noreferrer nofollow">
        {l.name}
      </HLink>
    )
  }

  return (
    <HLink key={key} href={l.url} isExternal className={cls} rel="noreferrer nofollow">
      {l.name}
    </HLink>
  )
}

export default function FooterLinks({ group, className }: Props) {
  return (
    <div className={className}>
      <h3 className="text-base font-semibold text-foreground">{group.title}</h3>
      <ul className="mt-3 space-y-2">
        {group.links.map((l, i) => (
          <li key={i} className="list-none">
            {LinkItem(l, i)}
          </li>
        ))}
      </ul>
    </div>
  )
}
