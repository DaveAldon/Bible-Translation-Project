import { Tree, Link, Node } from '../types/tree'
import { getTree } from './tree'

export interface BibleNode {
  name: string
  attributes?: Record<string, string | number | boolean>
  children?: BibleNode[]
}

export interface BibleRaw {
  name: string
  attributes?: Record<string, string | number | boolean>
  children?: string[]
}

export const generateTree = async (): Promise<Tree> => {
  const { bibles } = await getTree()
  const newLinks: Link[] = []
  const newNodes: Node[] = []

  const bibleNodesRaw: BibleRaw[] = bibles.map((bible) => {
    const name = bible.title
    const attributes = {
      ...bible,
    }
    const children = bible.parents.split(',')
    return {
      name,
      attributes,
      children,
    }
  })

  // recursively find the child node
  const findChildNode = (bible: BibleRaw): BibleNode => {
    const name = bible.name
    const attributes = bible.attributes
    const children = bible.children

    const childNodes: BibleNode[] = []
    if (!children) return { name, attributes, children: childNodes }
    children.forEach((child) => {
      const childBible = bibleNodesRaw.find(
        (bible) => bible.attributes?.id === child
      )
      if (childBible) {
        const childNode = findChildNode(childBible)
        childNodes.push(childNode)
      }
    })

    return {
      name,
      attributes,
      children: childNodes,
    }
  }

  // find the root node
  const rootNode = bibleNodesRaw.find((bible) => bible.name === 'God')
  if (rootNode) {
    const root = findChildNode(rootNode)
    console.log(root)
  }

  return JSON.parse(
    JSON.stringify({
      nodes: newNodes,
      links: newLinks,
    })
  ) as Tree
}
