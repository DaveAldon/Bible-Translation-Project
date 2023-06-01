import { getTranslationData } from '@/app/util/getTranslationData'
import { Node, Edge } from 'react-flow-renderer'

export const { nodes: initialNodes, edges: initialEdges } = getTranslationData()

export const getFilteredNodes = (sliderValue: number): Node[] => {
  return initialNodes.filter((node) => parseInt(node.data.year) <= sliderValue)
}
export const getFilteredEdges = (filteredNodes: Node[]): Edge[] => {
  const doNodesExist = (edgeId: string) => {
    let found = false
    edgeId.split('~').every((id) => {
      if (filteredNodes.find((node: Node) => node.id === id)) {
        found = true
        return true
      } else {
        found = false
        return false
      }
    })
    return found
  }

  return initialEdges.filter((edge) => {
    if (doNodesExist(edge.id)) {
      return {
        ...edge,
      }
    }
  })
}

export const getFilteredGraph = (sliderValue: number) => {
  const filteredNodes = getFilteredNodes(sliderValue)
  const filteredEdges = getFilteredEdges(filteredNodes)
  return { nodes: filteredNodes, edges: filteredEdges }
}
