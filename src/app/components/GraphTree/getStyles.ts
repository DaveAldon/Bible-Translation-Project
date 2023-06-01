import { BibleNode } from '../../../../types/tree'
import { Node, Edge } from 'react-flow-renderer'

const edgeStyle = (opacity: number) => {
  return {
    stroke: 'url(#edge-gradient)',
    strokeWidth: 5,
    strokeOpacity: opacity,
  }
}

export const getNodeStyles = (
  nodes: Node[],
  exclusionNodes: Node[],
  selectedNode?: BibleNode,
  reset?: boolean
) => {
  return nodes.map((node) => {
    let type = 'activeGraphNode'
    if (reset) {
      return {
        ...node,
        type,
      }
    }
    if (selectedNode?.data.title === 'God') {
      if (node.id !== selectedNode.id) {
        type = 'inactiveGraphNode'
      }
    } else {
      if (nodes.length === exclusionNodes.length) {
      } else {
        if (selectedNode && selectedNode.id === node.id) {
        } else if (
          exclusionNodes.find((excludedNode) => excludedNode.id === node.id)
        ) {
          type = 'inactiveGraphNode'
        } else {
        }
      }
    }
    return {
      ...node,
      type,
    }
  })
}

export const getEdgeStyles = (edges: Edge[], includedNodes: Node[]) => {
  return edges.map((edge) => {
    /* const base = '#FFFFFF'
    const activeColor = hext(base, 60)
    const deactiveColor = hext(base, 10)
    let color */

    let opacity = 1
    if (
      includedNodes.length === 2 &&
      includedNodes[0].id === includedNodes[1].id
    ) {
      opacity = 0.2
      //color = activeColor
    } else {
      const foundSource = includedNodes.find((node) => node.id === edge.source)
      const foundTarget = includedNodes.find((node) => node.id === edge.target)
      //color = foundSource && foundTarget ? activeColor : deactiveColor
      opacity = foundSource && foundTarget ? 1 : 0.2
    }

    return {
      ...edge,
      style: {
        ...edge.style,
        /* stroke: color,
        strokeWidth: 5, */
        ...edgeStyle(opacity),
      },
    }
  })
}
