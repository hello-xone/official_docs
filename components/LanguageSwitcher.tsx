import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { setLanguage, ensureI18nInitialized, getCurrentLanguage } from "@/i18n";
import { useRouter } from "next/router";

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
  const [currentLanguage, setCurrentLanguage] = React.useState("en");

  React.useEffect(() => {
    const initializeLanguage = async () => {
      await ensureI18nInitialized(router.locale ?? undefined);

      // 获取当前路由的语言和保存的语言
      const routerLocale = router.locale;
      const savedLanguage = getCurrentLanguage();

      let finalLanguage = "en"; // 默认英文

      // 优先级：1. 路由中的语言 2. 保存的语言
      if (routerLocale && routerLocale.startsWith("zh")) {
        finalLanguage = "zh";
      } else if (savedLanguage === "zh") {
        finalLanguage = "zh";
        // 不在初始化时跳转路由，只设置i18n语言
      }

      // 设置i18n语言，但不跳转路由
      if (i18n.language !== finalLanguage) {
        await i18n.changeLanguage(finalLanguage);
      }

      setCurrentLanguage(finalLanguage);
      setMounted(true);
    };

    initializeLanguage();
  }, [i18n, router]);

  const label = mounted
    ? currentLanguage === "zh"
      ? t("lang.zh")
      : t("lang.en")
    : "";

  if (!mounted) {
    return null;
  }

  const handleLanguageChange = async (newLang: "en" | "zh") => {
    if (newLang === currentLanguage) return;

    let asPath = router.asPath || "/";

    // 特殊处理：在路径开头添加语言代码，并替换路径中的语言代码
    // 例如：/study/en/account -> /zh/study/zh/account

    // 1. 首先在路径开头添加新的语言代码
    if (!asPath.startsWith(`/${newLang}/`)) {
      asPath = `/${newLang}${asPath.startsWith("/") ? asPath : `/${asPath}`}`;
    }

    // 2. 然后替换路径中的语言代码
    // 使用正则表达式替换所有出现的当前语言代码
    const regex = new RegExp(`/${currentLanguage}/`, "g");
    asPath = asPath.replace(regex, `/${newLang}/`);

    // 3. 确保路径末尾没有双斜杠
    asPath = asPath.replace(/\/\//g, "/");

    try {
      setLanguage(newLang);
      setCurrentLanguage(newLang);

      // 同时更新路由和 i18n
      await Promise.all([
        router.push(asPath, asPath, { locale: newLang, scroll: false }),
        i18n.changeLanguage(newLang),
      ]);
    } catch (error) {
      console.error("Failed to change language:", error);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="flat" size="sm" className="min-w-0 px-2 gap-1">
          <GlobeIcon />
          <span className="text-small hidden lg:block">{label}</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={t("actions.switch_language")}
        selectionMode="single"
        selectedKeys={new Set([currentLanguage])}
      >
        <DropdownItem key="en" onPress={() => handleLanguageChange("en")}>
          {t("lang.en")}
        </DropdownItem>
        <DropdownItem key="zh" onPress={() => handleLanguageChange("zh")}>
          {t("lang.zh")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
