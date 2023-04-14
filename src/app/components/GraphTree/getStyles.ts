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
    if (nodes.length === exclusionNodes.length) {
      color = hext(background, 100)
    } else {
      if (selectedNode && selectedNode.id === node.id) {
        color = hext(background, 100)
      } else if (
        exclusionNodes.find((excludedNode) => excludedNode.id === node.id)
      ) {
        color = hext(background, 30)
      } else {
        color = hext(background, 100)
      }
    }
    return {
      ...node,
      style: {
        ...node.style,
        background: color,
      },
    }
  })
}

export const getEdgeStyles = (edges: Edge[], includedNodes: BibleNode[]) => {
  console.log('includedNodes', includedNodes)
  return edges.map((edge) => {
    const color = '#77dd77'
    return {
      ...edge,
      style: {
        ...edge.style,
        stroke: color,
      },
    }
  })
}
