import type { FC } from 'react'

export const Video: FC<{ src: string, isMt6?: boolean }> = ({ src, isMt6 = true }) => {
  return (
    <video
      muted
      autoPlay
      playsInline
      loop
      controls
      className={`x:focus-visible:nextra-focus rounded-xl ${isMt6 ? 'mt-6' : ''}`}
    >
      <source src={`https://xone-docs.s3.ap-southeast-1.amazonaws.com/${src}`} type="video/mp4" />
    </video>
  )
}
