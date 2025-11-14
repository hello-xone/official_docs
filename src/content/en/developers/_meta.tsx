import type { MetaRecord } from 'nextra'

export default {
  ready: 'Ready Build',
  '-- Xone Chian': {
    type: 'separator',
    title: 'Xone Chain',
  },
  rpc: 'RPC Endpoints',
  testnet: 'Testnet',
  explorers: 'Block Explorers',
  faucets: 'Faucets',
  architecture: 'Architecture',

  '-- DEVELOPERS': {
    type: 'separator',
    title: 'Developers',
  },
  guide: 'Getting Started',
  tools: 'Developer Kit',
  token: 'Bridge Tokens',
  contracts: 'Major Contracts',
  console: {
    title: 'Json RPC ↗',
    href: '/openapi/overview',
  },
  operators: 'Node Operators',
  standard: 'Standard',
  verify: {
    title: 'Verify Contracts ',
    href: 'https://docs.blockscout.com/devs/verification',
  },
  display: 'Display Tokens',
} satisfies MetaRecord
