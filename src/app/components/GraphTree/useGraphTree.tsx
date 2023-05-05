import React, { useCallback } from 'react'
import {
  addEdge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  useReactFlow,
} from 'reactflow'
import 'reactflow/dist/style.css'
import './index.css'
import { getTranslationData } from '@/app/util/getTranslationData'
import { getLayoutedElements } from './getLayoutedElements'
import { Bible, BibleNode } from '../../../../types/tree'
import { getNodesOnPath, getReverseNodesOnPath } from '@/app/util/nodePaths'
import { getEdgeStyles, getNodeStyles } from './getStyles'

const { nodes: initialNodes, edges: initialEdges } = getTranslationData()

export interface BibleInteractable extends Bible {
  onClickFavorite: (data: Bible) => void
  onClickExpand: (data: Bible) => void
}

const getFilteredNodes = (initialNodes: BibleNode[], sliderValue: number) => {
  return initialNodes.filter((node) => parseInt(node.data.year) <= sliderValue)
}
const getFilteredEdges = (
  initialEdges: Edge[],
  filteredNodes: BibleNode[],
  sliderValue: number
) => {
  return initialEdges.filter((edge) => {
    const nodeRef = filteredNodes.find(
      (node: BibleNode) => node.id === edge.source
    )
    if (nodeRef) {
      return parseInt(nodeRef.data.year) <= sliderValue
    }
  })
}

interface UseGraphTreeProps {
  sliderValue: number
  filterName: string
}
export const useGraphTree = (props: UseGraphTreeProps) => {
  const [selectedNode, setSelectedNode] = React.useState<BibleNode | null>(null)
  const [nodes, setNodes, _onNodesChange] = useNodesState<BibleInteractable[]>(
    []
  )
  const [edges, setEdges, _onEdgesChange] = useEdgesState<Edge[]>([])
  const [modalVisible, setModalVisible] = React.useState(false)
  const options = { hideAttribution: true }

  const onNodeClickEvent = useCallback(
    (node: BibleNode) => {
      setSelectedNode(node as BibleNode)
      //setModalVisible(true)
    },
    [setSelectedNode]
  )

  const resetNodes = useCallback(() => {
    const filteredNodes = getFilteredNodes(initialNodes, props.sliderValue)
    const filteredEdges = getFilteredEdges(
      initialEdges,
      filteredNodes,
      props.sliderValue
    )
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      filteredNodes,
      filteredEdges
    )
    const styledNodes = getNodeStyles(
      [...filteredNodes],
      [...filteredNodes],
      undefined,
      true
    ).map((node) => {
      return {
        ...node,
        data: {
          ...node.data,
          onClickExpand: () => {
            setModalVisible(true)
          },
          onClickFavorite: () => {
            onNodeClickEvent(node as BibleNode)
          },
        },
      }
    })
    const styledEdges = getEdgeStyles([...layoutedEdges], [...styledNodes])
    setNodes([...(styledNodes as any)])
    setEdges([...styledEdges])
    setSelectedNode(null)
  }, [props.sliderValue, selectedNode])

  React.useEffect(() => {
    const filteredNodes = getFilteredNodes(initialNodes, props.sliderValue)
    const filteredEdges = getFilteredEdges(
      initialEdges,
      filteredNodes,
      props.sliderValue
    )

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      filteredNodes,
      filteredEdges
    )

    const nodesOnPath = selectedNode
      ? getNodesOnPath({
          node: selectedNode,
          nodes: [...layoutedNodes],
        })
      : layoutedNodes

    const reverseNodesOnPath = selectedNode
      ? getReverseNodesOnPath({
          nodes: layoutedNodes,
          nodesOnPath: [...nodesOnPath],
        })
      : layoutedNodes

    const styledNodes = getNodeStyles(
      [...filteredNodes],
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
            onClickExpand: () => {
              setModalVisible(true)
            },
            onClickFavorite: () => {
              onNodeClickEvent(node as BibleNode)
            },
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
            onClickExpand: () => {
              setModalVisible(true)
            },
            onClickFavorite: () => {
              onNodeClickEvent(node as BibleNode)
            },
          },
        }
      }
    })

    const styledEdges = getEdgeStyles(
      [...layoutedEdges],
      [...nodesOnPath, ...(selectedNode ? [selectedNode] : [])]
    )

    setNodes([...(filterStyles as any)])
    setEdges([...styledEdges])
  }, [props.sliderValue, selectedNode, props.filterName])

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

  return {
    nodes,
    edges,
    onConnect,
    onLayout,
    options,
    onNodeClickEvent,
    modalVisible,
    setModalVisible,
    selectedNode,
    resetNodes,
  }
}
