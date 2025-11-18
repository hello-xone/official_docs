'use client'

import React from 'react'
import FeatureCard from './XCard/FeatureCard'

const FeaturesCards: React.FC = () => {
  return (
    <div className="flex justify-center gap-4 flex-wrap">
      <FeatureCard title="Unified Address Format">
        Accounts utilize a single address format that is functional across both EVM and Cosmos SDK. This design allows users to interact with Cosmos modules and EVM smart contracts using one consistent address, eliminating the need for separate accounts.
      </FeatureCard>

      <FeatureCard title="Dual Functionality">
        The account model supports native Cosmos SDK operations (like staking, governance, and IBC transfers) alongside EVM-specific actions (such as deploying contracts and transferring tokens). This versatility enables comprehensive interactions from a single account structure, streamlining user experience.
      </FeatureCard>

      <FeatureCard title="Cross-Chain Comp">
        Built to integrate with bridge, accounts support data transfers between other blockchains with Ethereum ecosystems, for multi-chain application cases.
      </FeatureCard>
    </div>
  )
}

export default FeaturesCards
