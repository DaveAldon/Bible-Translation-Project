import { BibleNode } from '../../../types/tree'
import { Node } from 'react-flow-renderer'

interface ReverseNodesOnPathProps {
  nodes: Node[]
  nodesOnPath: Node[]
}

export const getReverseNodesOnPath = (props: ReverseNodesOnPathProps) => {
  return [...props.nodes.filter((el) => !props.nodesOnPath.includes(el))]
}

interface NodesOnPathProps {
  nodes: Node[]
  node: BibleNode
}
export const getNodesOnPath = (props: NodesOnPathProps): Node[] => {
  const nodesOnPath: Node[] = []
  const getParents = (node: Node) => {
    if (node.data.title === 'God') {
      nodesOnPath.push(node)
      return
    }
    const parents: string[] = node.data.parents.split(',')
    if (parents.length > 0) {
      parents.forEach((parent) => {
        const parentRef = props.nodes.find((node) => node.id === parent)
        if (parentRef) {
          nodesOnPath.push(parentRef)
          getParents(parentRef)
        }
      })
    }
  }
  getParents(props.node)
  return [...new Map(nodesOnPath.map((v) => [v.id, v])).values()]
}
