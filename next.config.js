const nextra = require('nextra');

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: {
    renderer: 'katex',
    options: {
      macros: {
        '\\RR': '\\mathbb{R}'
      }
    }
  }
});

module.exports = withNextra({
  eslint: {
    ignoreDuringBuilds: true
  },
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en'
  },
  webpack(config) {

    const allowedSvgRegex = /\.svg$/;

    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg')
    );
    fileLoaderRule.exclude = allowedSvgRegex;

    config.module.rules.push({
      test: allowedSvgRegex,
      use: ['@svgr/webpack']
    });
    return config
  },
  async redirects() {
    return [
      {
        source: '/developers',
        destination: '/developers/ready',
        permanent: false
      }
    ]
  },
  images: {
    unoptimized: true
  }
});