'use client'

import { Card, CardBody, CardHeader } from '@nextui-org/react'
import React from 'react'

export interface FeatureCardProps {
  title: string
  children: React.ReactNode
  className?: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  children,
  className = '',
}) => {
  return (
    <Card className={`flex-shrink-0 w-3/5 sm:w-3/4 lg:w-2/5 flex-col ${className}`}>
      <CardHeader className="flex top-6 gap-2">
        <div className="flex flex-col">
          <p className="text-md font-bold">{title}</p>
        </div>
      </CardHeader>
      <CardBody className="px-3 pt-0 pb-3 text-small">
        <p>{children}</p>
      </CardBody>
    </Card>
  )
}

export default FeatureCard
