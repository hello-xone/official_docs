"use client";
import React, { useState, useEffect } from "react";
import { XoneLogo } from "./XoneLogo";
import { useIsDarkMode } from "@components/hooks/useIsDarkMode";
import { useRouter } from "next/router";

export function HeaderLogo() {
  const router = useRouter();
  const [opacity, setOpacity] = useState(0);
  const isDarkMode = useIsDarkMode(router.pathname === "/");

  useEffect(() => {
    // 让 opacity 从 0 -> 1，触发 transition
    setTimeout(() => setOpacity(1), 0);
  }, []);

  return (
    <div
      className="flex items-center font-semibold text-[22px] transition-opacity duration-300"
      style={{ opacity }}
    >
      <XoneLogo />

      <span className={`pl-4 { color: isDarkMode ? 'white' : 'black' }`}>
        Xone Docs
      </span>
    </div>
  );
}
