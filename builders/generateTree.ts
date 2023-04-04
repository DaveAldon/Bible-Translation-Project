import { Tree, Link, Node } from '../types/tree'
import { getTree } from './tree'

export const generateTree = async (): Promise<Tree> => {
  const { bibles } = await getTree()
  const newLinks: Link[] = []
  const newNodes: Node[] = []

  bibles.forEach((bible) => {
    if (bible.parents) {
      bible.parents
        .split(',')
        .map((parent: string) => parent.trim())
        .forEach((parent) => {
          newLinks.push({
            source: bible.id,
            target: parent,
          })
        })
    }
    newNodes.push({
      ...bible,
    })
  })

  return JSON.parse(
    JSON.stringify({
      nodes: newNodes,
      links: newLinks,
    })
  ) as Tree
}
