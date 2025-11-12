"use client";

import NextLink from "next/link";
import { Link as HLink } from "@heroui/react";
import type { FooterGroup, FooterLink } from "@/lib/links";
import { useTranslation } from 'react-i18next';

type Props = { group: FooterGroup; className?: string };

function LinkItem(l: FooterLink, key: number) {
  const { t } = useTranslation();
  if (l.later) {
    return (
      <div key={key} className="flex items-center gap-2 text-default-600">
        <span className="text-sm">{t(l.name)}</span>
        <span className="text-[12px] rounded-full border border-[#ff04204d] px-2 py-0.5 text-[#FF0420]">
          {t('actions.later')}
        </span>
      </div>
    );
  }

  const cls = "text-sm text-default-600 hover:text-foreground transition";
  if (l.internal) {
    return (
      <HLink key={key} as={NextLink} href={l.url} className={cls}>
        {t(l.name)}
      </HLink>
    );
  }

  return (
    <HLink key={key} href={l.url} isExternal className={cls}>
      {t(l.name)}
    </HLink>
  );
}

export default function FooterLinks({ group, className }: Props) {
  const { t } = useTranslation();
  return (
    <div className={className}>
      <h3 className="text-base font-semibold text-foreground">{t(group.title)}</h3>
      <ul className="mt-3 space-y-2">
        {group.links.map((l, i) => (
          <li key={i} className="list-none">
            {LinkItem(l, i)}
          </li>
        ))}
      </ul>
    </div>
  );
}
