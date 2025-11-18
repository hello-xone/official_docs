import type { MetaRecord } from 'nextra'

export default {
  eth_getTransactionByHash: 'eth_getTransactionByHash',
  eth_getTransactionCount: 'eth_getTransactionCount',
  eth_getTransactionReceipt: 'eth_getTransactionReceipt',
  eth_newPendingTransactionFilter: 'eth_newPendingTransactionFilter',
  eth_getTransactionByBlockHashAndIndex: 'eth_getTransactionByBlockHashAndIndex',
  eth_getTransactionByBlockNumberAndIndex: 'eth_getTransactionByBlockNumberAndIndex',
  txpool_content: 'txpool_content',
} satisfies MetaRecord
