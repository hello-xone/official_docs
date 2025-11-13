import { useEffect, useState } from 'react'

export function useIsMobile(breakpointPx: number = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') { return }
    const mq = window.matchMedia(`(max-width: ${breakpointPx}px)`)
    const apply = () => setIsMobile(mq.matches)
    apply()
    mq.addEventListener?.('change', apply)
    return () => mq.removeEventListener?.('change', apply)
  }, [breakpointPx])

  return isMobile
}
