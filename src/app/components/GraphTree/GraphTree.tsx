'use client'
import { useWindowSize } from '@/app/hooks/useWindowSize'
import ReactFlow, {
  Controls,
  MiniMap,
  ReactFlowProvider,
  Viewport,
  useReactFlow,
} from 'reactflow'
import { useGraphTree } from './useGraphTree'
import { BibleNode } from '../../../../types/tree'
import { hext } from '@davealdon/hext'
import { ActiveGraphNode, InactiveGraphNode } from './GraphNode/GraphNode'
import './node.style.css'
import React from 'react'

const nodeTypes = {
  activeGraphNode: ActiveGraphNode,
  inactiveGraphNode: InactiveGraphNode,
}

const Flow = (props: GraphTreeProps) => {
  const reactFlowInstance = useReactFlow()
  const [width, height] = useWindowSize()
  const { nodes, edges, options, setSelectedNode } = useGraphTree(props)

  React.useEffect(() => {
    reactFlowInstance.fitView({ padding: 1 })
  }, [props.sliderValue])

  if (nodes === null || height === 0 || width === 0) {
    return <></>
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      proOptions={options}
      nodesDraggable={false}
      nodeTypes={nodeTypes}
      minZoom={0.2}
      onNodeClick={(event, node) => {
        setSelectedNode(node as BibleNode)
      }}
    >
      <MiniMap
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          backgroundColor: hext('#808080', 30),
        }}
      />
      <Controls />
    </ReactFlow>
  )
}

interface GraphTreeProps {
  sliderValue: number
}
export const GraphTree = (props: GraphTreeProps) => {
  const [width, height] = useWindowSize()

  return (
    <ReactFlowProvider>
      <div
        style={{
          height: height - 68,
          width,
        }}
      >
        <Flow {...props} />
      </div>
    </ReactFlowProvider>
  )
}
