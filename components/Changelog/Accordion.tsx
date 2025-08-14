import React from "react";

export function Accordion({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border border-gray-200 divide-y divide-gray-200 dark:divide-gray-800 dark:border-gray-800">{children}</div>;
}

export function AccordionItem({ title, defaultOpen = false, children }: { title: React.ReactNode; defaultOpen?: boolean; children: React.ReactNode }) {
  return (
    <details className="group" open={defaultOpen}>
      <summary className="flex gap-2 justify-between items-center px-4 py-3 text-sm font-medium text-gray-700 transition-colors cursor-pointer select-none dark:text-gray-200">
        <span>{title}</span>
        <svg className="w-5 h-5 text-gray-500 transition-transform shrink-0 group-open:rotate-180 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
        </svg>
      </summary>
      <div className="overflow-hidden transition-[max-height] ease-in-out max-h-0 group-open:max-h-[1000px]">
        <div className="px-4 pb-3" style={{ overflow: "hidden" }}>
          <div className="max-w-none prose prose-sm dark:prose-invert">
            {children}
          </div>
        </div>
      </div>
    </details>
  );
}

Accordion.Item = AccordionItem as any;


