import { hext } from '@davealdon/hext'
import { Category_Colors } from '../../../../types/categories.enum'
import { BibleNode } from '../../../../types/tree'
import { Edge } from 'reactflow'

export const getNodeStyles = (
  nodes: BibleNode[],
  exclusionNodes: BibleNode[],
  selectedNode?: BibleNode
) => {
  return nodes.map((node) => {
    const background =
      Category_Colors[node.data.category as keyof typeof Category_Colors]
    let color = ''
    let type = 'activeGraphNode'
    if (nodes.length === exclusionNodes.length) {
      color = hext(background, 100)
    } else {
      if (selectedNode && selectedNode.id === node.id) {
        color = hext(background, 100)
      } else if (
        exclusionNodes.find((excludedNode) => excludedNode.id === node.id)
      ) {
        color = hext(background, 10)
        type = 'inactiveGraphNode'
      } else {
        color = hext(background, 100)
      }
    }
    return {
      ...node,
      type,
      style: {
        ...node.style,
        background: color,
        borderRadius: 10,
      },
    }
  })
}

export const getEdgeStyles = (edges: Edge[], includedNodes: BibleNode[]) => {
  return edges.map((edge) => {
    const activeColor = '#77dd77'
    const deactiveColor = hext(activeColor, 30)

    let color

    if (
      includedNodes.length === 2 &&
      includedNodes[0].id === includedNodes[1].id
    ) {
      color = activeColor
    } else {
      const foundSource = includedNodes.find((node) => node.id === edge.source)
      const foundTarget = includedNodes.find((node) => node.id === edge.target)
      color = foundSource && foundTarget ? activeColor : deactiveColor
    }

    return {
      ...edge,
      style: {
        ...edge.style,
        stroke: color,
        strokeWidth: 5,
      },
    }
  })
}
