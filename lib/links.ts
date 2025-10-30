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
  title: "links.title1",
  links: [
    { name: "links.text1",         url: EXTERNAL_LINKS.TokenUp },
    { name: "links.text2",        url: EXTERNAL_LINKS.Settlement },
    { name: "links.text3",         url: EXTERNAL_LINKS.RainLink },
    { name: "links.text4",           url: EXTERNAL_LINKS.SwapX },
    { name: "links.text5",   url: EXTERNAL_LINKS.Xone_ID },
    { name: "links.text6",     url: EXTERNAL_LINKS.NFT_Market },
  ],
};

export const ResourcesdGroup: FooterGroup = {
  title: "links.title2",
  links: [
    { name: "links.text7",             url: EXTERNAL_LINKS.Scan },
    { name: "links.text8",           url: EXTERNAL_LINKS.Faucet },
    { name: "links.text9",         url: EXTERNAL_LINKS.docs + "openapi/overview", internal: true },
    { name: "links.text10",         url: EXTERNAL_LINKS.docs + "developers/rpc", internal: true },
    { name: "links.text11",         url: EXTERNAL_LINKS.docs + "gateway", internal: true },
    { name: "links.text12",        url: EXTERNAL_LINKS.docs + "developers/tools", internal: true },
    { name: "links.text13",             url: EXTERNAL_LINKS.Status },
    { name: "links.text14",           url: EXTERNAL_LINKS.Github },
  ],
};

export const ProgramsGroup: FooterGroup = {
  title: "links.title3",
  links: [
    { name: "links.text15", url: "https://xone.org/commercial", internal: true },
    { name: "links.text16", url: "https://forum.xone.org", internal: true },
    { name: "links.text17",     url: "", later: true },
    { name: "links.text18",        url: "", later: true },
  ],
};

export const FOOTER_GROUPS: FooterGroup[] = [EcologyGroup, ResourcesdGroup, ProgramsGroup];

export const FOOTER_POLICY_LINKS: FooterLink[] = [
  { name: "links.text19",    url: EXTERNAL_LINKS.docs + "study/service" },
  { name: "links.text20",      url: EXTERNAL_LINKS.docs + "study/privacy" },
];
