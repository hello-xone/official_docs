"use client";

import { useEffect, useState } from "react";
import { useTheme } from "nextra-theme-docs";
import { useRouter } from "next/router";

/**
 * 深浅色模式 Hook
 * - 首页 (/) 强制 light
 * - 其它页面跟随 colorMode / system
 * - 不在 hook 顶层访问 window，避免 SSR 报错
 */
export function useIsDarkMode(): boolean {
  const { theme: colorMode } = useTheme();   // 可以在 SSR 使用
  const router = useRouter();                // 可以在 SSR 使用
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // 首页强制 light
    if (router.pathname === "/") {
      setIsDarkMode(false);
      return;
    }

    // 仅在客户端进行后续判断
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    // 初始化
    if (colorMode === "system") {
      setIsDarkMode(mq.matches);
    } else {
      const themeInLocalStorage = localStorage.getItem("theme");
      setIsDarkMode(
        colorMode ? colorMode === "dark" : themeInLocalStorage === "dark"
      );
    }

    // 监听系统主题变化
    const darkModeSetter = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mq.addEventListener("change", darkModeSetter);
    return () => mq.removeEventListener("change", darkModeSetter);
  }, [colorMode, router.pathname]);

  return isDarkMode;
}
