"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { Link as NLink } from "nextra-theme-docs";
import { FOOTER_GROUPS, FOOTER_POLICY_LINKS } from "@/lib/links";
import { EXTERNAL_LINKS } from "@/lib/external";
import {
  TwitterIcon,
  DiscordIcon,
  TelegramIcon,
  GithubIcon,
  MediumIcon,
  RedditIcon,
  YoutubeIcon,
  ChatMeIcon,
  CoingeckoIcon,
} from "@/components/icons";
import { NavLogo } from "../NavLogo";
import FooterLinks from "./FooterLinks";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);

  const contacts = [
    { icon: TwitterIcon,   url: EXTERNAL_LINKS.Twitter,  label: "Twitter" },
    { icon: TelegramIcon, url: EXTERNAL_LINKS.Telegram, label: "Telegram" },
    { icon: GithubIcon, url: EXTERNAL_LINKS.Github,   label: "GitHub" },
    { icon: YoutubeIcon, url: EXTERNAL_LINKS.Youtube,  label: "YouTube" },
    { icon: MediumIcon, url: EXTERNAL_LINKS.Medium,   label: "Medium" },
    { icon: DiscordIcon, url: EXTERNAL_LINKS.Discord,  label: "Discord" },
    { icon: ChatMeIcon, url: EXTERNAL_LINKS.ChatMe,  label: "ChatMe" },
    { icon: RedditIcon, url: EXTERNAL_LINKS.Reddit,   label: "Reddit" },
    { icon: CoingeckoIcon, url: EXTERNAL_LINKS.Coingecko,   label: "Coingecko" },
  ];

  return (
    <footer className="footer-root bg-transparent text-foreground w-full">
      <div className="footer-container mx-auto w-full max-w-screen-xl px-4 py-4 md:py-6">
        <div className="footer-top flex flex-col gap-4 lg:flex-row lg:items-stretch lg:justify-between lg:gap-6">
          <div className="footer-content lg:flex-1 lg:flex lg:flex-col">
            <div className="logo mb-3 md:mb-4">
              <div className="w-[158px] md:w-[160px]">
                <NavLogo variant="footer" />
              </div>
            </div>

            <div className="text-xs text-default-600 lg:hidden">
              © {year ?? ""} Xone Foundation.
            </div>

            {/* 跟右侧列等高时，Follow Us 贴底 */}
            <section className="mt-4 lg:mt-auto">
              <h3 className="mb-3 text-sm font-semibold">Follow Us</h3>
              <div className="social-icons flex  items-center gap-2.5 md:gap-3">
                {contacts.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <a
                    key={i}
                    href={c.url}
                    aria-label={c.label}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      flex items-center justify-center
                      w-7 h-7 md:w-8 md:h-8   /* 手机固定 28px，桌面 32px */
                      p-0 shrink-0
                      rounded-[2px]
                      bg-transparent dark:bg-white
                      border-0
                    "
                  >
                    <Icon className="w-8 h-8 md:w-6 md:h-6" />
                  </a>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="lg:ml-auto lg:max-w-3xl w-full">
            {/* 手机两列、桌面三列；手机 gap 更小 */}
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {FOOTER_GROUPS.map((g, i) => (
                <section key={i}>
                  <FooterLinks group={g} />
                </section>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom mt-6 md:mt-8 border-t border-divider pt-5 md:pt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="policy-links flex flex-wrap gap-x-4 gap-y-2 text-sm text-default-600">
            {FOOTER_POLICY_LINKS.map((l, i) => (
              <NLink
                key={i}
                href={l.url}
                target={l.internal ? undefined : "_blank"}
                rel={l.internal ? undefined : "noreferrer"}
                className="hover:text-foreground"
              >
                {l.name}
              </NLink>
            ))}
          </div>

          <div className="copyright text-xs text-default-600 hidden lg:block">
            © {year ?? ""} Xone Foundation.
          </div>
        </div>
      </div>
    </footer>
  );
}
