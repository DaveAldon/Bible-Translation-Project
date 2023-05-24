'use client'
import React from 'react'
import { useWindowSize } from '@/app/hooks/useWindowSize'
import ReactFlow, {
  ControlButton,
  Controls,
  MiniMap,
  Panel,
  ReactFlowProvider,
  useReactFlow,
  useStore,
} from 'reactflow'
import { useGraphTree } from './useGraphTree'
import { BibleNode } from '../../../../types/tree'
import { hext } from '@davealdon/hext'
import { ActiveGraphNode, InactiveGraphNode } from './GraphNode/GraphNode'
import './node.style.css'
import { BibleModal } from '../BibleModal/BibleModal'
import { Category_Colors } from '../../../../types/categories.enum'

const nodeTypes = {
  activeGraphNode: ActiveGraphNode,
  inactiveGraphNode: InactiveGraphNode,
}

interface GraphTreeProps {
  sliderValue: number
  filterName: string
  fitViewToggle: boolean
}
const Flow = (props: GraphTreeProps) => {
  const reactFlowInstance = useReactFlow()
  const [width, height] = useWindowSize()
  const graphTree = useGraphTree(props)

  const fitView = () => {
    reactFlowInstance.fitView({ padding: 1 })
  }

  const widthSelector = (state: { width: any }) => state.width
  const heightSelector = (state: { height: any }) => state.height
  const reactFlowWidth = useStore(widthSelector)
  const reactFlowHeight = useStore(heightSelector)

  React.useEffect(() => {
    if (!props.fitViewToggle) return
    setTimeout(() => {
      fitView()
    }, 100)
  }, [reactFlowWidth, reactFlowHeight, reactFlowInstance, props.sliderValue])

  if (graphTree.nodes === null || height === 0 || width === 0) {
    return <></>
  }

  return (
    <>
      <BibleModal
        isOpen={graphTree.modalVisible}
        setIsOpen={() => {}}
        closeModal={() => graphTree.setModalVisible(false)}
        data={graphTree.selectedNode}
        navigateToNode={(node: BibleNode) => graphTree.onNodeClickEvent(node)}
      />
      <ReactFlow
        nodes={graphTree.nodes}
        edges={graphTree.edges}
        proOptions={graphTree.options}
        nodesDraggable={false}
        nodeTypes={nodeTypes}
        minZoom={0.2}
        onNodeClick={(_event, node) => {
          if (graphTree.selectedNode?.id !== node.id) {
            graphTree.onNodeClickEvent(node as BibleNode)
          }
        }}
        onPaneClick={() => {
          graphTree.resetNodes()
        }}
        onInit={() => {
          setTimeout(() => {
            fitView()
          }, 1)
        }}
      >
        <MiniMap
          zoomable
          pannable
          nodeColor={(node) => {
            return Category_Colors[
              node.data.category as keyof typeof Category_Colors
            ]
          }}
          style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            backgroundColor: hext('#808080', 30),
          }}
        />
        <Controls onFitView={() => fitView()} showInteractive={false}>
          <ControlButton
            style={{
              width: '100%',
              borderTopRightRadius: 5,
            }}
            onClick={() => console.log('another action')}
            title="another action"
          >
            <div>How does this work?</div>
          </ControlButton>
        </Controls>
        <svg>
          <defs>
            <linearGradient id="edge-gradient">
              <stop offset="0%" stopColor="#ae53ba" />
              <stop offset="100%" stopColor="#2a8af6" />
            </linearGradient>

            <marker
              id="edge-circle"
              viewBox="-5 -5 10 10"
              refX="0"
              refY="0"
              markerUnits="strokeWidth"
              markerWidth="10"
              markerHeight="10"
              orient="auto"
            >
              <circle
                stroke="#2a8af6"
                strokeOpacity="0.75"
                r="2"
                cx="0"
                cy="0"
              />
            </marker>
          </defs>
        </svg>
      </ReactFlow>
    </>
  )
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
