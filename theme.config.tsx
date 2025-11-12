import React from "react";
import type { ReactElement } from "react";
import { NavLogo } from "@/components/NavLogo";
import Footer from "@/components/Footer/Footer";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import { Article } from "@components/blog";
import ImageViewer from "./components/ImageViewer";
import AgentButton from "@/components/AgentButton";
import PixelBlastBackground from "@/components/PixelBlastBackground";

const primaryHue = 0;

const config: DocsThemeConfig = {
  logo: <NavLogo variant="header" />,
  // banner: {
  //   key: '2.0-release',
  //   text: (
  //     <a href="https://knight.center/" target="_blank">
  //       🎉 Join us to illuminate the possibilities of the future with action. →
  //     </a>
  //   )
  // },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    autoCollapse: true,
    toggleButton: true,
  },

  navbar: {
    extraContent: <AgentButton />,
  },

  docsRepositoryBase: "https://github.com/hello-xone/official_docs",

  primaryHue,

  // i18n: [
  //   { locale: "en", text: "English" },
  //   { locale: "zh", text: "中文" },
  // ],
  search: {
    placeholder: 'Search documentation...',
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s | Xone Docs",
      };
    } else {
      return {
        title: "WelCome", // 这里设置首页标题
        titleTemplate: null,
      };
    }
  },

  head: () => {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter } = useConfig();
    const url =
      "https://xone.org" +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`);

    return (
      <>
        <meta property="og:url" content={url} />
        <meta property="og:title" content={frontMatter.title || "Xone Docs"} />
        <meta
          property="og:description"
          content={
            frontMatter.description ||
            "The decentralized Layer-1 blockchain platform based on the Ethereum protocol uses leading behavioral value incentives (BVI) to ensure that every interaction of every user participating in Xone will create value, and every contribution will be rewarded."
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </>
    );
  },
  components: {
    p: (props: any) => {
      const isMdxImage =
        typeof props?.children.type === "function" &&
        (props?.children.type.name === "img" ||
          props?.children.type.displayName === "MDXImage");
      const isNativeImg = props?.children.type === "img";
      if (isMdxImage || isNativeImg) {
        return (
          <ImageViewer
            alt={props?.children.props.alt || ""}
            src={props?.children.props.src.src || ""}
            className=""
          ></ImageViewer>
        );
      } else {
        return <p {...props} />;
      }
    },
  },
  main: ({ children }: { children: React.ReactNode }): ReactElement => {
    const { pathname } = useRouter();
    const isHome = pathname === "/";
    const isBlog = pathname.match(/^\/blog\/(?!tag\/).+/);

    if (isBlog) {
      return (
        <>
          <Article />
          {children}
        </>
      );
    }

    return (
      <>
        {/* {!isHome && <PixelBlastBackground />} */}
        {children}
      </>
    );
  },

  footer: {
    text: <Footer />,
  },

  toc: {
    backToTop: true,
    title: "Table of contents",
  },

  editLink: {
    text: "✏️ Edit this page on GitHub",
  },
};

export default config;
