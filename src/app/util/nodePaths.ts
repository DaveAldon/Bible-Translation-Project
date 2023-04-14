import { BibleNode } from '../../../types/tree'

interface ReverseNodesOnPathProps {
  nodes: BibleNode[]
  nodesOnPath: BibleNode[]
}

export const getReverseNodesOnPath = (props: ReverseNodesOnPathProps) => {
  return [...props.nodes.filter((el) => !props.nodesOnPath.includes(el))]
}

interface NodesOnPathProps {
  nodes: BibleNode[]
  node: BibleNode
}
export const getNodesOnPath = (props: NodesOnPathProps): BibleNode[] => {
  const nodesOnPath: BibleNode[] = []
  const getParents = (node: BibleNode) => {
    if (node.data.title === 'God') {
      nodesOnPath.push(node)
      return
    }
    const parents = node.data.parents.split(',')
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
