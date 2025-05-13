import { Tabs, Tab } from "@heroui/react";
import { CodeSnippetObject } from "../types";
import { getLanguageName } from "../getLanguageName";
import { IconLanguage } from "../../icons/IconLanguage";
import React from "react";

export interface RequestSnippetSelectorsProps {
  snippets: CodeSnippetObject[]
  currentLang: CodeSnippetObject["language"]
  onSelect: React.Dispatch<React.SetStateAction<CodeSnippetObject["language"]>>
}

export const RequestSnippetSelectors: React.FC<RequestSnippetSelectorsProps> = ({
  snippets,
  currentLang,
  onSelect,
}) => (
  <Tabs
  selectedKey={currentLang}
    onSelectionChange={(key) =>
    onSelect(key as CodeSnippetObject["language"])
    }
    variant="underlined"
    radius="full"
    color="primary"
    className="w-full overflow-x-auto top-8"
  >
    {snippets.map((s) => (
      <Tab
        key={s.language}
        title={
          <span className="flex items-center gap-2 nx-text-primary-600">
            <IconLanguage language={s.language} />
            {getLanguageName(s.language)}
          </span>
        }
      />
    ))}
  </Tabs>
);