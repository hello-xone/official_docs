"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@heroui/react";
import { Link as NLink } from "nextra-theme-docs";
import { FOOTER_GROUPS, FOOTER_POLICY_LINKS } from "@/lib/links";
import { EXTERNAL_LINKS } from "@/lib/external";
import { addToast } from "@heroui/react";

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
import { useTranslation } from 'react-i18next';

// 定义域名建议列表
const domains = ['@gmail.com', '@yahoo.com', '@outlook.com', '@hotmail.com', '@icloud.com', '@qq.com', '@163.com', '@126.com'];

// EmailInput 组件
function EmailInput({ email, setEmail }: { 
  email: string; 
  setEmail: (email: string) => void 
}) {
  const [suggestions, setSuggestions] = useState<Array<string>>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { t } = useTranslation();
  const generateSuggestions = useCallback((input: string) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    if (input.includes('@')) {
      const [localPart, domainPart] = input.split('@');
      const filtered = domains
        .filter(domain => domain.startsWith('@' + domainPart))
        .map(domain => `${localPart}${domain}`);
      setSuggestions(filtered);
    } else {
      const filtered = domains.map(domain => `${input}${domain}`);
      setSuggestions(filtered);
    }
    setSelectedSuggestion(-1);
  }, []);

  const handleChange = useCallback((value: string) => {
    setEmail(value);
    generateSuggestions(value);
  }, [setEmail, generateSuggestions]);

  const selectSuggestion = useCallback((suggestion: string) => {
    setEmail(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  }, [setEmail]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!suggestions.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestion(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestion(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && selectedSuggestion >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[selectedSuggestion]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  }, [suggestions, selectedSuggestion, selectSuggestion]);

  return (
    <div className="relative flex-1">
      <input
        type="text"
        value={email}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        onKeyDown={handleKeyDown}
        placeholder={t('footer.text5')}
        className="w-full px-4 py-3 pr-24 text-sm bg-white dark:bg-default-100 rounded-lg border border-default-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-default-400"
      />

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 left-0 right-0 bottom-full mb-1 bg-white dark:bg-black max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => selectSuggestion(suggestion)}
              onMouseEnter={() => setSelectedSuggestion(index)}
              className={`px-4 py-2 cursor-pointer text-sm ${
                selectedSuggestion === index
                  ? 'bg-blue-100 dark:bg-blue-900'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { t } = useTranslation();


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

  // 邮箱验证函数
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 处理邮件订阅
  const handleEmailSubscribe = useCallback(async(e) => {
    e.preventDefault()
    if (email && isValidEmail(email)) {
      try {
        fetch(`https://openapi.xone.org/emailsub/subscribe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }).then(async res => {
          console.log(res,'res-----------');
          
          if (res.ok) {
            const result = await res.json() as { msg: string; code: number; data: string; message: string };
            console.log(result,'result-----------');
            setEmail('');
            if (result.code === 0) {
              addToast({
                title: 'Success',
                description: result.msg || result.message || 'Subscribed',
                color: "success",
              });
            } else {
              addToast({
                title: 'Error',
                description: result.msg || result.data || 'Something went wrong',
                color: "danger",
              });
            }

          } else {
            const result = await res.json() as { msg: string };
            addToast({
              title: 'Error',
              description: result.msg || 'Something went wrong',
              color: "danger",
            });
          }
        });
        // apiFetch('xonePublic:subscribe', {
        //   fetchParams: {
        //     method: 'POST',
        //     body: {
        //       email: [ email ],
        //     },
        //   },
        // });
        // setEmail('');
        // toaster.success({
        //   title: 'Success',
        //   description: 'Subscribed',
        // });
      } catch (error) {
        addToast({
          title: 'Error',
          description: (error)?.payload?.message || 'Something went wrong. Try again later.',
          color: "danger",
        });
      }
    } else {
      addToast({
        title: 'Error',
        description: 'Please enter a valid email address',
        color: "danger",
      });
    }

  }, [ email ]);

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
              © {year ?? ""} Xone {t('footer.text6')}
            </div>

            {/* 邮箱订阅组件 */}
            <section className="mb-6 lg:mb-8 lg:w-[380px]">
              <p className="mb-4 text-sm text-default-600 leading-relaxed">
                {t('footer.text2')}
              </p>
              
              <form onSubmit={handleEmailSubscribe} className="email-subscription relative w-full">
                <EmailInput email={email} setEmail={setEmail} />
                <Button
                  type="submit"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                  size="sm"
                  style={{backgroundColor: '#FF0000'}}
                >
                  {t('footer.text3')}
                </Button>
              </form>
              
              {message && (
                <p className={`mt-2 text-sm ${
                  message.includes("Opening") 
                    ? "text-blue-600" 
                    : "text-red-600"
                }`}>
                  {message}
                </p>
              )}
            </section>

            {/* 跟右侧列等高时，Follow Us 贴底 */}
            <section className="mt-4 lg:mt-auto">
              <h3 className="mb-3 text-sm font-semibold">{t('footer.text4')}</h3>
              <div className="social-icons flex flex-wrap items-center gap-2.5 md:gap-3">
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
                      w-7 h-7 md:w-8 md:h-8
                      p-0 shrink-0
                      rounded-[2px]
                      bg-transparent dark:bg-white
                      border-0
                    "
                  >
                    <Icon className="mx-auto" />
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
                {t(l.name)}
              </NLink>
            ))}
          </div>

          <div className="copyright text-xs text-default-600 hidden lg:block">
            © {year ?? ""} Xone {t('footer.text6')}
          </div>
        </div>
      </div>
    </footer>
  );
}
