import { Edge } from 'reactflow'
import { getTree } from './tree'
import { BibleNode, Tree } from '../types/tree'

const position = { x: 0, y: 0 }
const edgeType = 'smoothstep'

export const generateTree = async (): Promise<Tree> => {
  const { bibles } = await getTree()
  const newEdges: Edge[] = []
  const newNodes: BibleNode[] = []

  bibles.forEach((bible) => {
    const id = bible.id
    const data = { ...bible, label: bible.title }
    const node = { id, data, position, filterStyle: false }
    newNodes.push(node)

    if (bible.parents !== '') {
      const parents = bible.parents.split(',')
      parents.forEach((parent) => {
        const source = parent
        const target = bible.id
        const edge = {
          id: `${source}~${target}`,
          source,
          target,
          edgeType,
          animated: true,
        }
        newEdges.push(edge)
      })
    }
  })

  return JSON.parse(
    JSON.stringify({
      nodes: newNodes,
      edges: newEdges,
    })
  ) as Tree
}
