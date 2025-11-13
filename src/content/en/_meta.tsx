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
  introduction: {
    type: 'page',
    title: 'Study 📖',
    theme: {
      navbar: true,
      toc: false,
    },
  },
  docs: {
    title: 'What is BVI 🎯',
    type: 'page',
  },
  pages: {
    title: 'Developers 🔧',
    type: 'menu',
    items: {
      about: {
        title: 'About',
        href: '/about',
      },
      contact: {
        title: 'Contact Us',
        href: 'mailto:hi@example.com',
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
