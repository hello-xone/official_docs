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
  webpack(config) {
    // Add webpack resolve fallback and plugins to handle @swc/helpers paths
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      {
        apply(resolver) {
          resolver.hooks.resolve.tapAsync('SwcHelpersResolver', (context, request, callback) => {
            // Handle imports from @swc/helpers/_/* and @swc/helpers/cjs/*
            if (request.request && request.request.startsWith('@swc/helpers/_/')) {
              const path = request.request.replace('@swc/helpers/_/', '@swc/helpers/lib/');
              return resolver.resolve(context, {
                ...request,
                request: path
              }, callback);
            }
            if (request.request && request.request.startsWith('@swc/helpers/cjs/')) {
              const path = request.request
                .replace('@swc/helpers/cjs/', '@swc/helpers/lib/')
                .replace('.cjs', '.js');
              return resolver.resolve(context, {
                ...request,
                request: path
              }, callback);
            }
            callback();
          });
        }
      }
    ];

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