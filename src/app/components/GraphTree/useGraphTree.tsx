import React, { useCallback } from 'react'
import {
  addEdge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
} from 'reactflow'
import 'reactflow/dist/style.css'
import './index.css'
import { getTranslationData } from '@/app/util/getTranslationData'
import { getLayoutedElements } from './getLayoutedElements'
import { BibleNode } from '../../../../types/tree'

const { nodes: initialNodes, edges: initialEdges } = getTranslationData()

interface UseGraphTreeProps {
  sliderValue: number
}
export const useGraphTree = (props: UseGraphTreeProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const options = { hideAttribution: true }

  React.useEffect(() => {
    const filteredNodes = initialNodes.filter(
      (node) => parseInt(node.data.year) <= props.sliderValue
    )
    const filteredEdges = initialEdges.filter((edge) => {
      const nodeRef = filteredNodes.find(
        (node: BibleNode) => node.id === edge.source
      )
      if (nodeRef) {
        return parseInt(nodeRef.data.year) <= props.sliderValue
      }
    })

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      filteredNodes,
      filteredEdges
    )

    setNodes([...layoutedNodes])
    setEdges([...layoutedEdges])
  }, [props.sliderValue])

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    []
  )

  const onLayout = useCallback(
    (direction: string | undefined) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction)

      setNodes([...layoutedNodes])
      setEdges([...layoutedEdges])
    },
    [nodes, edges]
  )

  return { nodes, edges, onConnect, onLayout, options }
}
