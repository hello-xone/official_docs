import React from 'react'
import type { ReactElement } from 'react';
import { NavLogo } from '@/components/NavLogo'
import Footer from "@/components/Footer/Footer";
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'
import { Article } from "@components/blog"
import ImageViewer from './components/ImageViewer';
import AgentButton from "@/components/AgentButton";

const primaryHue = 0

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
    extraContent: <AgentButton />
  },

  docsRepositoryBase: 'https://github.com/hello-xone/official_docs',

  primaryHue,

  useNextSeoProps() {
    const { asPath } = useRouter()
    const { frontMatter } = useConfig()
    
    // 默认 description
    const defaultDescription = 'The decentralized Layer-1 blockchain platform based on the Ethereum protocol uses leading behavioral value incentives (BVI) to ensure that every interaction of every user participating in Xone will create value, and every contribution will be rewarded.'
    const description = frontMatter.description || defaultDescription
    
    if (asPath !== '/') {
      return {
        titleTemplate: '%s | Xone Docs',
        description: description,
        openGraph: {
          description: description,
          images: [
            {
              url: 'https://docs.xone.org/summary_large_image.png'
            }
          ]
        },
        twitter: {
          card: 'summary_large_image',
          site: '@xone_chain'
        }
      }
    }
    
    return {
      description: description,
      openGraph: {
        description: description,
        images: [
          {
            url: 'https://docs.xone.org/summary_large_image.png'
          }
        ]
      }
    }
  },

  head: () => {
    const { frontMatter, title } = useConfig()

    // Keywords：优先使用 frontMatter.keywords，否则使用页面标题
    const keywords = frontMatter.keywords || `Xone, blockchain, ${title}`

    return (
      <>
        {/* 只添加 Nextra 不生成的标签 */}
        <meta name="keywords" content={keywords} />
      </>
    )
  },
  components: {
    p: (props: any) => {
      const isMdxImage =
        typeof props?.children.type === 'function' &&
        (props?.children.type.name === 'img' || props?.children.type.displayName === 'MDXImage')
      const isNativeImg = props?.children.type === 'img'
      if (isMdxImage || isNativeImg) {
        return <ImageViewer alt={ props?.children.props.alt || '' } src={ props?.children.props.src.src || '' } className="" ></ImageViewer>
      } else {
        return <p {...props} />
      }

    },
  },
  main: ({ children }: { children: React.ReactNode }): ReactElement => {
    const { pathname } = useRouter();
    const isBlog = pathname.match(/^\/blog\/(?!tag\/).+/);
    if (isBlog) {
      return (
        <>
          <Article />
          {children}
        </>
      );
    }
    return <>{children}</>;
  },

  footer: {
    text: <Footer />
  },

  toc: {
    backToTop: true,
    title: 'Table of contents',
  },

  editLink: {
    text: '✏️ Edit this page on GitHub'
  },
}



export default config
