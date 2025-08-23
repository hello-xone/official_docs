"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { XoneLogo } from "./XoneLogo";
import { useIsDarkMode } from "@components/hooks/useIsDarkMode";

type Props = {
  variant?: "header" | "footer"; // header: "/", footer: "https://xone.org"
  className?: string;
};

export function NavLogo({ variant = "header", className = "" }: Props) {
  const isDarkMode = useIsDarkMode();

  const [mounted, setMounted] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setOpacity(1), 0);
    return () => clearTimeout(t);
  }, []);

  const isHeader = variant === "header";
  const label = isHeader ? "Xone Docs" : "Xone";
  const href = isHeader ? "/" : "https://xone.org";
  const external = !isHeader;

  if (!mounted) return null;

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={[
        "group flex items-center font-semibold transition-opacity duration-300",
        "text-[clamp(1rem,3.5vw,1.375rem)]",
        className,
      ].join(" ")}
      style={{ opacity }}
      aria-label={label}
    >
      <div className="flex items-center">
        <XoneLogo />
        <span
          className={[
            "ml-[10px]",
            isDarkMode ? "text-white" : "text-black",
            "dark:text-foreground",
          ].join(" ")}
        >
          {label}
        </span>
      </div>
    </Link>
  );
}

export default NavLogo;
