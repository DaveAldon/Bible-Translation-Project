'use client'
import React from 'react'
import { useWindowSize } from '@/app/hooks/useWindowSize'
import ReactFlow, {
  ControlButton,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
  useStore,
} from 'reactflow'
import { useGraphTree } from './useGraphTree'
import { BibleNode } from '../../../../types/tree'
import { hext } from '@davealdon/hext'
import { ActiveGraphNode, InactiveGraphNode } from './GraphNode/GraphNode'
import './node.style.css'
import { InfoModal } from '../InfoModal/InfoModal'
import {
  LockClosedIcon,
  LockOpenIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/20/solid'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { getColorFromSpectrum } from '@/app/util/spectrums'
import { getTranslationData } from '@/app/util/getTranslationData'

const nodeTypes = {
  activeGraphNode: ActiveGraphNode,
  inactiveGraphNode: InactiveGraphNode,
}

interface GraphTreeProps {
  sliderValue: number
  filterName: string
  fitViewToggle: boolean
  setFitViewToggle: (value: boolean) => void
  showTooltips: boolean
  setShowTooltips: (value: boolean) => void
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
    if (props.filterName !== '') {
      const node = getTranslationData().nodes.find(
        (node: BibleNode) => node.data.title === props.filterName
      )
      if (node) {
        reactFlowInstance.fitView({
          nodes: [node],
          maxZoom: reactFlowInstance.getZoom(),
        })
      }
    }
  }, [props.filterName])

  React.useEffect(() => {
    if (!props.fitViewToggle) return
    setTimeout(() => {
      fitView()
    }, 500)
  }, [reactFlowWidth, reactFlowHeight, reactFlowInstance, props.sliderValue])

  if (graphTree.nodes === null || height === 0 || width === 0) {
    return <></>
  }

  const navigateToNode = (node: BibleNode) => {
    graphTree.onNodeClickEvent(node)
    reactFlowInstance.fitView({
      nodes: [node],
      maxZoom: reactFlowInstance.getZoom(),
    })
  }

  return (
    <>
      <InfoModal
        isOpen={graphTree.modalVisible}
        setIsOpen={() => graphTree.setModalVisible(true)}
        closeModal={() => {
          if (graphTree.selectedNode) {
            graphTree.resetNodes()
          }
          graphTree.setModalVisible(false)
        }}
        data={graphTree.modalNode}
        navigateToNode={navigateToNode}
        activatePath={(node: BibleNode) => graphTree.activatePath(node)}
        resetPaths={() => graphTree.resetNodes()}
        showTooltips={props.showTooltips}
      />
      <ReactFlow
        nodes={graphTree.nodes}
        edges={graphTree.edges}
        edgesFocusable={false}
        draggable={false}
        proOptions={graphTree.options}
        nodesDraggable={false}
        nodeTypes={nodeTypes}
        minZoom={0.05}
        onNodeClick={(_event, node) => {
          if (graphTree.selectedNode?.id !== node.id) {
            graphTree.onNodeClickEvent(node as BibleNode)
          }
        }}
        onPaneClick={async () => {
          if (graphTree.selectedNode) {
            await graphTree.resetNodes()
          }
        }}
        onInit={() => {
          setTimeout(() => {
            fitView()
          }, 500)
        }}
      >
        <MiniMap
          zoomable
          pannable
          nodeColor={(node) => {
            return node.data.title === 'God'
              ? '#FFFFFF'
              : getColorFromSpectrum(parseInt(node.data.spectrum))
          }}
          style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            backgroundColor: hext('#808080', 30),
            borderRadius: '10px',
            overflow: 'hidden',
          }}
          ariaLabel="Mini Map"
          maskColor={hext('#808080', 30)}
        />

        <Controls onFitView={() => fitView()} showInteractive={false}>
          <ControlButton
            data-tooltip-id="lock-button-tooltip"
            data-tooltip-content="Locks/Unlocks the translation view so that they don't automatically fit to the screen"
            onClick={() => props.setFitViewToggle(!props.fitViewToggle)}
            title="lock fit view"
          >
            {props.fitViewToggle ? (
              <LockOpenIcon className="h-5 w-5" />
            ) : (
              <LockClosedIcon className="h-5 w-5" />
            )}
          </ControlButton>
          <ControlButton
            onClick={() => props.setShowTooltips(!props.showTooltips)}
            title="Help"
          >
            {props.showTooltips ? (
              <QuestionMarkCircleIcon className="h-5 w-5 bg-red-400" />
            ) : (
              <QuestionMarkCircleIcon className="h-5 w-5" />
            )}
          </ControlButton>
        </Controls>
        <ReactTooltip
          id="lock-button-tooltip"
          place="right"
          variant="error"
          isOpen={props.showTooltips}
        />
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
