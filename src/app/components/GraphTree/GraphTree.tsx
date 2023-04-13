'use client'
import { useWindowSize } from '@/app/hooks/useWindowSize'
import ReactFlow from 'reactflow'
import { useGraphTree } from './useGraphTree'

export const GraphTree = () => {
  const [width, height] = useWindowSize()
  const { nodes, edges, options } = useGraphTree()

  if (nodes === null || height === 0 || width === 0) {
    return <></>
  }
  return (
    <div
      style={{
        height,
        width,
      }}
    >
      <ReactFlow nodes={nodes} edges={edges} fitView proOptions={options} />
    </div>
  )
}
