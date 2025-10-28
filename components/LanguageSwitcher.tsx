import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { setLanguage, ensureI18nInitialized } from '@/i18n';
import { useRouter } from 'next/router';

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const router = useRouter();
  const routerLocale = typeof router?.locale === 'string' ? router.locale : undefined;
  const current = (routerLocale || i18n.language)?.startsWith('zh') ? 'zh' : 'en';
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    ensureI18nInitialized();
    setMounted(true);
  }, []);
  const label = mounted ? (current === 'zh' ? t('lang.zh') : t('lang.en')) : '';

  if (!mounted) {
    return null;
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="flat" size="sm" className="min-w-0 px-2 gap-1">
          <GlobeIcon />
          <span className="text-small">{label}</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label={t('actions.switch_language')} selectionMode="single" selectedKeys={new Set([current])}>
        <DropdownItem
          key="en"
          onPress={async () => {
            const asPath = router.asPath || '/';
            await router.push(asPath, asPath, { locale: 'en', scroll: false });
            setLanguage('en');
          }}
        >
          {t('lang.en')}
        </DropdownItem>
        <DropdownItem
          key="zh"
          onPress={async () => {
            const asPath = router.asPath || '/';
            await router.push(asPath, asPath, { locale: 'zh', scroll: false });
            setLanguage('zh');
          }}
        >
          {t('lang.zh')}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
