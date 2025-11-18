'use client'

import React from 'react'
import FeatureCard from '../XCard/FeatureCard'

const FeaturesCards: React.FC = () => {
  return (
    <div className="mt-2 md:mt-6 flex gap-3 overflow-x-auto py-6 px-6">
      <FeatureCard title="**Unified Address Format**">
        Accounts utilize a single address format that is functional across both EVM and Cosmos SDK. This design allows users to interact with Cosmos modules and EVM smart contracts using one consistent address, eliminating the need for separate accounts.
      </FeatureCard>

      <FeatureCard title="**Dual Functionality**">
        The account model supports native Cosmos SDK operations (like staking, governance, and IBC transfers) alongside EVM-specific actions (such as deploying contracts and transferring tokens). This versatility enables comprehensive interactions from a single account structure, streamlining user experience.
      </FeatureCard>

      <FeatureCard title="**Cross-Chain Compatibility**">
        Built to integrate with the interoperability bridge, accounts support smooth asset and data transfers between [Xone](https://xone.org/) Chain and other blockchains within both Cosmos and Ethereum ecosystems, making them ideal for multi-chain applications and DeFi use cases.
      </FeatureCard>

      <FeatureCard title="**Enhanced Security**">
        Accounts are safeguarded by options like multi-signature and account recovery protocols. These additional layers of protection make them suitable for users and organizations with high security needs.
      </FeatureCard>

      <FeatureCard title="**Privacy-Enhanced Transactions**">
        Privacy features, including zk-SNARKs and stealth addresses, allow for confidential transactions directly from accounts, offering high levels of privacy and anonymity across chains.
      </FeatureCard>
    </div>
  )
}

export default FeaturesCards
