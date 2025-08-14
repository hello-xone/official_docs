import React from "react";
import styles from "./Timeline.module.css";

export type ChangelogEntryProps = {
  date: string;
  version?: string;
  title: string;
  tags?: string[];
  children?: React.ReactNode;
};

export default function ChangelogTimeline({ children, className = "", title, subtitle }: { children: React.ReactNode; className?: string; title?: React.ReactNode; subtitle?: React.ReactNode }) {
  return (
    <div className={`space-y-16 ${className}`}>
      {title ? (
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h2>
          {subtitle ? (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
          ) : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}

export function ChangelogEntry({ date, version, title, tags, children }: ChangelogEntryProps) {
  return (
    <section className="relative md:grid md:grid-cols-[160px_1fr] md:gap-8">
      <aside className="relative pr-6 mb-6 md:mb-0 md:pr-0">
        <div className="md:sticky md:top-20">
          <time className="block text-sm text-gray-500 dark:text-gray-400">{date}</time>
          {version ? (
            <span className="inline-flex justify-center items-center mt-3 w-9 h-9 text-xs font-semibold text-gray-800 rounded-md border border-gray-200 dark:text-gray-100 dark:border-gray-800">
              {version}
            </span>
          ) : null}
        </div>

        <span className="hidden md:block absolute -right-2 top-2 h-3 w-3 rounded-full bg-primaryHue shadow-[0_0_0_4px_rgba(0,0,0,0.06)] dark:shadow-[0_0_0_4px_rgba(255,255,255,0.06)]" />
        <span className="hidden absolute bottom-0 -right-px top-8 w-px bg-gray-200 md:block dark:bg-gray-800" />
      </aside>

      <div>
        <h3 className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">{title}</h3>
        {tags && tags.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {children ? (
          <div className={`prose prose-sm dark:prose-invert mt-4 max-w-none ${styles.content}`}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
