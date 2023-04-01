'use client'
import dynamic from 'next/dynamic'

const ForceGraph2D = dynamic(
  () =>
    import('../components/ForceGraph/ForceGraph').then(
      (mod) => mod.ForceGraph2D
    ),
  {
    ssr: false,
  }
)

const History = () => {
  return (
    <>
      <ForceGraph2D />
    </>
  )
}

export default History
