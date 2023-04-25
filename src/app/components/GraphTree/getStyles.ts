import { BibleNode } from '../../../../types/tree'
import { Edge } from 'reactflow'

export const getNodeStyles = (
  nodes: BibleNode[],
  exclusionNodes: BibleNode[],
  selectedNode?: BibleNode
) => {
  return nodes.map((node) => {
    let type = 'activeGraphNode'
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
    return {
      ...node,
      type,
    }
  })
}

export const getEdgeStyles = (edges: Edge[], includedNodes: BibleNode[]) => {
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
        stroke: 'url(#edge-gradient)',
        strokeWidth: 5,
        strokeOpacity: opacity,
      },
    }
  })
}
