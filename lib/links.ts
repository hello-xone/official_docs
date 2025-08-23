import { E } from "nextra/dist/types-c8e621b7";
import { EXTERNAL_LINKS } from "./external";

export type FooterLink = {
  name: string;
  url: string;
  internal?: boolean;
  later?: boolean;
};

export type FooterGroup = {
  title: string;
  links: FooterLink[];
};

export const EcologyGroup: FooterGroup = {
  title: "Ecology",
  links: [
    { name: "Wallet",         url: EXTERNAL_LINKS.TokenUp },
    { name: "Payment",        url: EXTERNAL_LINKS.Settlement },
    { name: "Bridge",         url: EXTERNAL_LINKS.RainLink },
    { name: "Swap",           url: EXTERNAL_LINKS.SwapX },
    { name: "Name Service",   url: EXTERNAL_LINKS.Xone_ID },
    { name: "NFT Market",     url: EXTERNAL_LINKS.NFT_Market },
  ],
};

export const ResourcesdGroup: FooterGroup = {
  title: "Resources",
  links: [
    { name: "Block Explorers",             url: EXTERNAL_LINKS.Scan },
    { name: "Faucet",           url: EXTERNAL_LINKS.Faucet },
    { name: "Json RPC",         url: EXTERNAL_LINKS.docs + "openapi/overview", internal: true },
    { name: "RPC Endpoints",         url: EXTERNAL_LINKS.docs + "developers/rpc", internal: true },
    { name: "Open Gateway",         url: EXTERNAL_LINKS.docs + "gateway", internal: true },
    { name: "Dev Tools",        url: EXTERNAL_LINKS.docs + "developers/tools", internal: true },
    { name: "Project Files",           url: EXTERNAL_LINKS.Github },
  ],
};

export const ProgramsGroup: FooterGroup = {
  title: "Global",
  links: [
    { name: "Cooperation", url: "https://xone.org/commercial", internal: true },
    { name: "Knight Project",     url: "", later: true },
    { name: "Recruitment",        url: "", later: true },
  ],
};

export const FOOTER_GROUPS: FooterGroup[] = [EcologyGroup, ResourcesdGroup, ProgramsGroup];

export const FOOTER_POLICY_LINKS: FooterLink[] = [
  { name: "Terms Service",    url: EXTERNAL_LINKS.docs + "study/service" },
  { name: "Privacy Policy",      url: EXTERNAL_LINKS.docs + "study/privacy" },
];
