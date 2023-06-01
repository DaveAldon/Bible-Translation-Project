import React, { useCallback } from 'react'
import { useNodesState, useEdgesState, Edge } from 'reactflow'
import 'reactflow/dist/style.css'
import './index.css'
import { Bible, BibleNode } from '../../../../types/tree'
import { getNodesOnPath, getReverseNodesOnPath } from '@/app/util/nodePaths'
import { getEdgeStyles, getNodeStyles } from './getStyles'
import { createGraphLayout } from './GraphUtilities/getElkLayoutedElements'
import {
  getFilteredEdges,
  getFilteredGraph,
  getFilteredNodes,
} from './GraphUtilities/graphFilters'
import { getTranslationData } from '@/app/util/getTranslationData'

const { nodes: _initialNodes, edges: initialEdges } = getTranslationData()

interface UseGraphTreeProps {
  sliderValue: number
  filterName: string
}
export const useGraphTree = (props: UseGraphTreeProps) => {
  const [selectedNode, setSelectedNode] = React.useState<BibleNode | null>(null)
  const [nodes, setNodes, _onNodesChange] = useNodesState<Bible[]>([])
  const [edges, setEdges, _onEdgesChange] = useEdgesState<Edge[]>([])
  const [modalVisible, setModalVisible] = React.useState(false)
  const [modalNode, setModalNode] = React.useState<BibleNode | null>(null)
  const options = { hideAttribution: true }

  const updateNodes = useCallback(async () => {
    const filteredGraph = getFilteredGraph(props.sliderValue)
    return await createGraphLayout(filteredGraph)
  }, [props.sliderValue])

  const activatePath = useCallback((node: BibleNode) => {
    setSelectedNode({ ...node })
  }, [])

  const onNodeClickEvent = useCallback((node: BibleNode) => {
    setSelectedNode({ ...node })
    setModalNode(node as BibleNode)
    setModalVisible(true)
  }, [])

  const resetNodes = useCallback(async () => {
    const elkNodes = await updateNodes()
    const filteredNodes = getFilteredNodes(props.sliderValue)

    const styledNodes = getNodeStyles(
      [...elkNodes],
      [...filteredNodes],
      undefined,
      true
    ).map((node) => {
      return {
        ...node,
        data: {
          ...node.data,
        },
      }
    })
    const styledEdges = getEdgeStyles([...initialEdges], [...styledNodes])
    setNodes([...styledNodes])
    setEdges([...styledEdges])
    setSelectedNode(null)
  }, [props.sliderValue, selectedNode])

  React.useEffect(() => {
    ;(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
      await resetNodes()
    })()
  }, [])

  React.useEffect(() => {
    ;(async () => {
      const elkNodes = await updateNodes()

      const nodesOnPath = selectedNode
        ? getNodesOnPath({
            node: selectedNode,
            nodes: [...elkNodes],
          })
        : elkNodes

      const reverseNodesOnPath = selectedNode
        ? getReverseNodesOnPath({
            nodes: elkNodes,
            nodesOnPath: [...nodesOnPath],
          })
        : elkNodes

      const styledNodes = getNodeStyles(
        elkNodes,
        reverseNodesOnPath,
        selectedNode || undefined
      )

      const filterStyles = styledNodes.map((node) => {
        if (
          props.filterName !== '' &&
          (node.data.title
            .toLowerCase()
            .includes(props.filterName.toLowerCase()) ||
            node.data.acronym
              .toLowerCase()
              .includes(props.filterName.toLowerCase()))
        ) {
          return {
            ...node,
            data: {
              ...node.data,
              //filterStyle: true,
            },
            style: {
              ...node.style,
              borderColor: 'white',
              borderRadius: 10,
              padding: 5,
              border: `5px solid white`,
              boxShadow: `0 0 50px white`,
            },
          }
        } else {
          return {
            ...node,
            data: {
              ...node.data,
            },
          }
        }
      })

      const selectedNodesOnPath = [
        ...nodesOnPath,
        ...(selectedNode ? [selectedNode] : []),
      ]

      const styledEdges = getEdgeStyles(edges, selectedNodesOnPath)

      setNodes([...filterStyles])
      setEdges([...styledEdges])
    })()
  }, [props.sliderValue, selectedNode, props.filterName])

  return {
    nodes,
    edges,
    options,
    onNodeClickEvent,
    modalVisible,
    setModalVisible,
    selectedNode,
    resetNodes,
    modalNode,
    activatePath,
  }
}
