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
  developers: {
    title: 'Developers 🔧',
    type: 'menu',
    items: {
      build_xone: {
        title: 'Build Xone ↗',
        href: '/developers/ready',
      },
      json_rpc: {
        title: 'Json RPC ↗',
        href: '/developers/openapi/overview',
      },
      gateway: {
        title: 'Gateway ↗',
        href: '/developers/gateway',
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
  roadmap: {
    title: 'Roadmap',
    type: 'page',
    display: 'hidden',
    theme: {
      layout: 'full',
    },
  },
} satisfies MetaRecord
