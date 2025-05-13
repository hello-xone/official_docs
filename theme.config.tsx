import React from 'react'
import type { ReactElement } from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'
import { Article } from "@components/blog"

const primaryHue = 0

const config: DocsThemeConfig = {
  logo: <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  }}>
  <svg width="30px" height="30px" viewBox="0 0 88 88" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g id="Xone" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="画板" transform="translate(-162.000000, -790.000000)" fill-rule="nonzero">
              <g id="编组-5" transform="translate(162.000000, 790.000000)">
                  <path d="M61.2948286,0 L26.7051086,0 C11.9562771,0 0,11.956296 0,26.7051274 L0,61.294816 C0,76.043616 11.9562771,87.9999874 26.7051086,87.9999874 L61.2948286,87.9999874 C76.0436286,87.9999874 88,76.043616 88,61.294816 L88,26.7051274 C88,11.956296 76.0436286,0 61.2948286,0 Z" id="路径" fill="#FF0420"></path>
                  <path d="M70.4138286,20.602296 C70.4138286,19.8893703 70.0275714,19.2570589 69.4335714,18.9897274 C69.2170286,18.8921103 68.9838286,18.8454389 68.7588,18.8454389 C68.3810286,18.8454389 68.0076571,18.9769989 67.7021714,19.2316017 L48.6992,35.0604446 C48.3214286,35.374416 48.1052,35.8370446 48.1052,36.329216 L48.1052,51.6783017 C48.1052,52.1704731 48.3214286,52.6331017 48.6992,52.9470731 L67.6977714,68.7757589 C68.2198,69.2088446 68.9580571,69.280816 69.5564571,68.9542731 C70.0828857,68.6654446 70.4138286,68.088416 70.4138286,67.4435017 L70.4138286,58.3194731 C70.4138286,57.8273017 70.1972857,57.3646731 69.8195143,57.046616 L59.3252,48.3047589 C58.8710571,47.9225874 58.608,47.3669303 58.608,46.772616 L58.608,41.2349017 C58.608,40.6405874 58.8710571,40.084616 59.3252,39.7027589 L69.8195143,30.9609017 C70.1972857,30.6469303 70.4138286,30.184396 70.4138286,29.6878874 L70.4138286,20.602296 Z" id="路径" fill="#FFFFFF"></path>
                  <path d="M39.2995429,52.9473874 C39.6773143,52.6331017 39.8935429,52.1707874 39.8935429,51.6783017 L39.8935429,36.329216 C39.8935429,35.8370446 39.6773143,35.374416 39.2995429,35.0604446 L20.2966343,19.231696 C19.9910857,18.9770931 19.6176514,18.8455331 19.2399743,18.8455331 C19.0108286,18.8455331 18.7816514,18.8922046 18.5652343,18.9898217 C17.97114,19.2571531 17.5849457,19.8894646 17.5849457,20.6023903 L17.5849457,29.6879817 C17.5849457,30.1802474 17.8013943,30.6428446 18.1790714,30.961216 L28.6735429,39.7030731 C29.1276229,40.0849303 29.3907114,40.6409017 29.3907114,41.2349017 L29.3907114,46.7729303 C29.3907114,47.3669303 29.1276229,47.9229017 28.6735429,48.3047589 L18.1790714,57.046616 C17.8013943,57.3605874 17.5849457,57.8273017 17.5849457,58.3197874 L17.5849457,67.4435017 C17.5849457,68.088416 17.9117086,68.6657589 18.44216,68.9542731 C19.0362857,69.2811303 19.7831543,69.2088446 20.3008771,68.7760731 L39.3039429,52.9473874 L39.2995429,52.9473874 Z" id="路径" fill="#FFFFFF"></path>
              </g>
          </g>
      </g>
  </svg>

    <p>Xone Docs</p>
  </div>,
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
