import React from 'react'
import type { ReactElement } from 'react';
import { HeaderLogo } from './components/HeaderLogo'
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'
import { Article } from "@components/blog"
import ImageViewer from './components/ImageViewer';

const primaryHue = 0

const config: DocsThemeConfig = {
  logo: <HeaderLogo />,
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
  project: {
    link: 'https://github.com/hello-xone/official_docs',
  },
  chat: {
    link: "https://x.com/xone_chain",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
        <path fill="currentColor" d="m8.78 6.91l7.68 10.11h-1.19L7.51 6.91z" />
        <path fill="currentColor" d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5m-2.32 16.3l-3.38-4.4l-3.88 4.4H5.28l5-5.71L5 5.7h4.43l3.06 4l3.51-4h2.14L13.48 11L19 18.3z" />
      </svg>
    ),
  },
  navbar: {
    extraContent: () => {
      return <>
        <a href="https://medium.com/@xone_chain" target="_blank" className='nx-p-2 nx-text-current'>
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4259" width="24" height="24">
            <path d="M0 0m85.333333 0l853.333334 0q85.333333 0 85.333333 85.333333l0 853.333334q0 85.333333-85.333333 85.333333l-853.333334 0q-85.333333 0-85.333333-85.333333l0-853.333334q0-85.333333 85.333333-85.333333Z" fill="#12100E" p-id="4260"></path>
            <path d="M251.605333 326.485333a27.392 27.392 0 0 0-8.576-22.826666L179.285333 225.066667V213.333333H377.173333l153.002667 343.381334L664.661333 213.333333H853.333333v11.733334L798.848 278.613333a16.512 16.512 0 0 0-6.058667 15.616v392.96c-0.981333 5.973333 1.365333 11.946667 6.058667 15.616l53.205333 53.504V768h-267.690666v-11.733333l55.125333-54.784c5.418667-5.546667 5.418667-7.168 5.418667-15.658667V368.213333l-153.301334 398.506667h-20.736L292.394667 368.213333v267.093334a37.376 37.376 0 0 0 9.898666 30.634666l71.68 89.002667v11.733333H170.666667v-11.733333l71.68-89.002667c7.68-8.106667 11.093333-19.498667 9.258666-30.677333V326.485333z" fill="#FFFFFF" p-id="4261"></path></svg>
        </a>
      </>
    }
  },

  docsRepositoryBase: 'https://github.com/hello-xone/official_docs',

  primaryHue,

  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s | Xone Docs'
      }
    }
  },

  head: () => {
    const { asPath, defaultLocale, locale } = useRouter()
    const { frontMatter } = useConfig()
    const url =
      'https://xone.org' +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`)

    return (
      <>
        <meta property="og:url" content={url} />
        <meta property="og:title" content={frontMatter.title || 'Xone Docs'} />
        <meta
          property="og:description"
          content={frontMatter.description || 'The decentralized Layer-1 blockchain platform based on the Ethereum protocol uses leading behavioral value incentives (BVI) to ensure that every interaction of every user participating in Xone will create value, and every contribution will be rewarded.'}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
    text: '© 2025 Xone.',
  },

  toc: {
    backToTop: true,
    title: 'Table of contents',
  },

}



export default config
