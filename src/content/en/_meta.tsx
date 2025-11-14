import type { MetaRecord } from 'nextra'

export default {
  index: {
    title: 'Hello',
    type: 'page',
    theme: {
      layout: 'full',
      navbar: true,
      toc: false,
    },
  },
  study: {
    type: 'page',
    title: 'Study 📖',
    theme: {
      navbar: true,
      toc: false,
    },
  },
  bvi: {
    title: 'What is BVI 🎯',
    type: 'page',
    theme: {
      navbar: true,
      toc: false,
    },
  },
  pages: {
    title: 'Developers 🔧',
    type: 'menu',
    items: {
      developers: {
        title: 'Build Xone ↗',
        href: '/developers/ready',
      },
      jsonrpc: {
        title: 'Json RPC ↗',
        href: '/openapi/overview',
      },
      gateway: {
        title: 'Gateway ↗',
        href: '/gateway',
      },
    },
  },
  blog: {
    title: 'Blog 📚',
    type: 'page',
    theme: {
      layout: 'full',
    },
  },
  forum: {
    title: 'Forum 💬',
    type: 'page',
    href: 'https://forum.xone.org/',
  },
  contact: {
    title: 'Dynamic 🎉',
    type: 'page',
    href: 'https://lu.ma/xone',
  },
} satisfies MetaRecord
