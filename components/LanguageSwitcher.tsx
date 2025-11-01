import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { setLanguage, ensureI18nInitialized, getCurrentLanguage } from '@/i18n';
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
  const [mounted, setMounted] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState('en');

  React.useEffect(() => {
    const initializeLanguage = async () => {
      // 确保 i18n 初始化完成
      await ensureI18nInitialized();
      
      // 优先级：1. 路由的 locale 2. i18n 的当前语言 3. 持久化存储的语言
      const routerLocale = router.locale;
      const i18nLanguage = i18n.language;
      const savedLanguage = getCurrentLanguage(); // 假设你有这个函数来获取保存的语言
      
      let finalLanguage = 'en';
      
      if (routerLocale && routerLocale.startsWith('zh')) {
        finalLanguage = 'zh';
      } else if (i18nLanguage && i18nLanguage.startsWith('zh')) {
        finalLanguage = 'zh';
      } else if (savedLanguage === 'zh') {
        finalLanguage = 'zh';
        // 如果持久化的语言与路由不一致，更新路由
        if (routerLocale !== 'zh') {
          const asPath = router.asPath || '/';
          await router.push(asPath, asPath, { locale: 'zh', scroll: false });
        }
      }
      
      // 确保 i18n 使用正确的语言
      if (i18nLanguage !== finalLanguage) {
        await i18n.changeLanguage(finalLanguage);
      }
      
      setCurrentLanguage(finalLanguage);
      setMounted(true);
    };

    initializeLanguage();
  }, [i18n, router]);

  const label = mounted ? (currentLanguage === 'zh' ? t('lang.zh') : t('lang.en')) : '';

  if (!mounted) {
    return null;
  }

  const handleLanguageChange = async (newLang: 'en' | 'zh') => {
    if (newLang === currentLanguage) return;
    
    const asPath = router.asPath || '/';
    
    try {
      setLanguage(newLang);
      setCurrentLanguage(newLang);
      // 同时更新路由和 i18n
      await Promise.all([
        router.push(asPath, asPath, { locale: newLang, scroll: false }),
        i18n.changeLanguage(newLang)
      ]);
      
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="flat" size="sm" className="min-w-0 px-2 gap-1">
          <GlobeIcon />
          <span className="text-small">{label}</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label={t('actions.switch_language')} selectionMode="single" selectedKeys={new Set([currentLanguage])}>
        <DropdownItem
          key="en"
          onPress={() => handleLanguageChange('en')}
        >
          {t('lang.en')}
        </DropdownItem>
        <DropdownItem
          key="zh"
          onPress={() => handleLanguageChange('zh')}
        >
          {t('lang.zh')}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default LanguageSwitcher;