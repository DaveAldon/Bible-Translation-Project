'use client'
import { useWindowSize } from '@/app/hooks/useWindowSize'
import ReactFlow from 'reactflow'
import { useGraphTree } from './useGraphTree'

interface GraphTreeProps {
  sliderValue: number
}
export const GraphTree = (props: GraphTreeProps) => {
  const [width, height] = useWindowSize()
  const { nodes, edges, options } = useGraphTree(props)

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
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        proOptions={options}
        nodesDraggable={false}
      />
    </div>
  )
}
