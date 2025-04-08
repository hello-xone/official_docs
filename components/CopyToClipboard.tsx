"use client";
import { useState } from "react";
import { addToast } from "@heroui/react";

type IconProps = {
  size?: number;
  height?: number;
  width?: number;
} & React.SVGProps<SVGSVGElement>;

type CopyToClipboardProps = {
  value: string;
  className?: string;
  iconSize?: number;
};

export const CopyIcon = ({ size, height, width, ...props }: IconProps) => (
  <svg
    fill="none"
    height={size || height || 20}
    width={size || width || 20}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M6 17C4.89543 17 4 16.1046 4 15V5C4 3.89543 4.89543 3 6 3H13C13.7403 3 14.3866 3.4022 14.7324 4M11 21H18C19.1046 21 20 20.1046 20 19V9C20 7.89543 19.1046 7 18 7H11C9.89543 7 9 7.89543 9 9V19C9 20.1046 9.89543 21 11 21Z" />
  </svg>
);

export const CheckIcon = ({ size, height, width, ...props }: IconProps) => (
  <svg
    fill="currentColor"
    height={size || height || 24}
    width={size || width || 24}
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="m2.394 13.742 4.743 3.62 7.616-8.704-1.506-1.316-6.384 7.296-3.257-2.486zm19.359-5.084-1.506-1.316-6.369 7.279-.753-.602-1.25 1.562 2.247 1.798z" />
  </svg>
);

export const CopyToClipboard = ({ value, className, iconSize = 18 }: CopyToClipboardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      addToast({
        title: "Copy successful!",
        description: `${value.length > 20 ? value.slice(0, 20) + "..." : value}`,
        color: "success", // 绿色提示
      });
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed!", err);
      addToast({
        title: "Copy failed!",
        description: "Please copy manually or try again!",
        color: "danger", // 红色提示
      });
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={className || "flex items-center gap-1 text-default-500 hover:text-primaryHue transition"}
      title={copied ? "Copied" : "Click Copy"}
    >
      {copied ? <CheckIcon size={iconSize} /> : <CopyIcon size={iconSize} />}
    </button>
  );
};
