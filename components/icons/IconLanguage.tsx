import IconGo from "components/icons/IconGo.png";
import IconJS from "components/icons/IconJS.png";
import IconNode from "components/icons/IconNode.png";
import IconPython from "components/icons/IconPython.png";
import IconRust from "components/icons/IconRust.png";
import IconShell from "components/icons/IconShell.png";
import Image from "next/image";
import { CodeSnippetObject } from "../EthereumMethod/types";

export type Props = {
  language: CodeSnippetObject["language"];
};

export function IconLanguage({ language }: Props) {
  switch (language) {
    case "js":
      return <Image src={IconJS} alt="JS" width={16} height={16} />;
    case "shell":
      return <Image src={IconShell} alt="Shell" width={16} height={16} />;
    case "node":
      return <Image src={IconNode} alt="Node" width={16} height={16} />;
    case "go":
      return <Image src={IconGo} alt="Go" width={16} height={16} />;
    case "python":
      return <Image src={IconPython} alt="Python" width={16} height={16} />;
    case "rust":
      return <Image src={IconRust} alt="Rust" width={16} height={16} />;
    default:
      return null;
  }
}
