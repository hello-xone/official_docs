"use client";

import { useEffect, useState } from "react";
import { useTheme as useNextThemes } from "next-themes";   // 注意：用 next-themes
import { usePathname } from "next/navigation";

// 返回 [ready, isDark]
export function useIsDarkMode(): [boolean, boolean] {
  const { theme, resolvedTheme } = useNextThemes(); // SSR 不访问浏览器 API
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // 未挂载前不要给出“可能和 SSR 不同”的值 —— 由使用方决定是否占位
  if (!mounted) return [false, false];

  // 首页强制 light（首帧已在客户端，保证一致）
  if (pathname === "/") return [true, false];

  const current = theme === "system" ? resolvedTheme : theme;
  return [true, current === "dark"];
}
