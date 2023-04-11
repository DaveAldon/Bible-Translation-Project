import React from 'react'
import { ForceGraphMethods } from 'react-force-graph-2d'
import { Tree, Node, Link } from '../../../../types/tree'
import { getTranslationData } from '@/app/util/getTranslationData'
import { clone } from '@/app/util/clone'
import * as d3 from 'd3'
import { ForceGraph2DProps } from './ForceGraphTypes'
import { Category_Colors } from '../../../../types/categories.enum'
import { hext } from '@davealdon/hext'

export const useForceGraph = (props: ForceGraph2DProps) => {
  const unfilteredData = getTranslationData()
  const [data, setData] = React.useState<Tree>()
  const ref = React.useRef<ForceGraphMethods>()
  const [initial, setInitial] = React.useState<boolean>(false)

  const getFilteredNodes = (
    filterYear: number,
    filterCategories: string[],
    data: Tree
  ): Node[] => {
    const correctPairs: { bad: string; good: string }[] = []

    data.nodes.forEach((node) => {
      filterCategories.forEach((category) => {
        if (node.category === category) {
          correctPairs.push({ bad: node.id, good: node.parents })
        }
      })
    })

    const categoryFiltered = data.nodes.map((node) => {
      const newNode = { ...node }
      filterCategories.forEach((category) => {
        node.parents.split(',').forEach((parent) => {
          if (
            data.nodes
              .find((node) => node.id === parent)
              ?.category.includes(category)
          ) {
            const parents = `${node.parents},${
              correctPairs.find((pair) => pair.bad === category)?.good || ''
            }`

            newNode.parents = parents
          }
        })
      })
      return newNode
    })

    const nodeFiltered = categoryFiltered.filter((node) => {
      return !filterCategories.join('').includes(node.category)
    })

    return nodeFiltered.filter((node) => {
      const nodeYear = parseInt(node.year)
      return nodeYear <= filterYear
    })
  }

  const getFilteredLinks = (filteredNodes: Node[], data: Tree): Link[] => {
    const narrowedLinks = filteredNodes
      .map((node) => {
        const parents = node.parents.split(',')
        const newLinks = parents.map((parent) => {
          return {
            source: parent,
            target: node.id,
          }
        })
        return newLinks
      })
      .flat()

    const filteredLinks = narrowedLinks.filter((link) => {
      const source = filteredNodes.find((node) => node.id === link.source)
      const target = filteredNodes.find((node) => node.id === link.target)
      return source !== undefined && target !== undefined
    })
    console.log(filteredLinks)

    return data.links.filter((link) => {
      const source = filteredNodes.find((node) => node.id === link.source)
      const target = filteredNodes.find((node) => node.id === link.target)
      return source !== undefined && target !== undefined
    })
  }

  const nodeCanvasObject = (
    node: any,
    ctx: CanvasRenderingContext2D,
    _globalScale: number
  ) => {
    const nodeRef = node as Node
    const label = nodeRef.acronym
    const fontSize = 4
    ctx.font = `${fontSize}px Sans-Serif`
    ctx.beginPath()
    ctx.arc(node.x, node.y, 7, 0, 2 * Math.PI, false)
    ctx.fillStyle = hext(
      Category_Colors[nodeRef.category as keyof typeof Category_Colors],
      nodeRef.filter === 'Author' ? 10 : 100
    )
    ctx.fill()
    ctx.lineWidth = 1
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = 'black'
    ctx.fillText(label, node.x, node.y)
    /* node.fx = node.x
    node.fy = node.y */
  }

  React.useEffect(() => {
    const nodes = getFilteredNodes(
      props.sliderValue,
      props.filterCategories,
      clone(unfilteredData)
    )
    const links = getFilteredLinks(nodes, clone(unfilteredData))
    const tempData = {
      nodes,
      links,
    }
    setData({ ...tempData })
  }, [props.sliderValue, props.filterCategories])

  React.useEffect(() => {
    const graphInstance = ref.current
    if (graphInstance) {
      // add vertical distance between nodes
      //graphInstance.d3Force('link')?.strength(0.5)
      //graphInstance.d3Force('link')?.distance(10)
      //graphInstance.d3Force('collide', d3.forceCollide(10))
      if (!initial) {
        //graphInstance.d3Force('horizontal', d3.forceY(100))

        setInitial(true)
        graphInstance.zoom(1, 0)
      }
    }
  }, [data])

  return { data, ref, nodeCanvasObject }
}
