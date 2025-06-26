import type { FC } from 'react'

export const Video: FC<{ src: string }> = ({ src }) => {
  return (
    <video
      muted
      autoPlay
      playsInline
      loop
      controls
      className="x:focus-visible:nextra-focus mt-6 rounded-xl"
    >
      <source src={'https://xone-docs.s3.ap-southeast-1.amazonaws.com/'+src} type="video/mp4" />
    </video>
  )
}