import React from 'react'
import { ForceGraphMethods } from 'react-force-graph-2d'
import { Tree, Node, Link } from '../../../../types/tree'
import { getTranslationData } from '@/app/util/getTranslationData'
import { clone } from '@/app/util/clone'
import * as d3 from 'd3'
import { ForceGraph2DProps } from './ForceGraphTypes'

export const useForceGraph = (props: ForceGraph2DProps) => {
  const unfilteredData = getTranslationData()
  const [data, setData] = React.useState<Tree>()
  const ref = React.useRef<ForceGraphMethods>()

  const getFilteredNodes = (filterYear: number, data: Tree): Node[] => {
    return data.nodes.filter((node) => {
      const nodeYear = parseInt(node.year)
      return nodeYear <= filterYear
    })
  }

  const getFilteredLinks = (filteredNodes: Node[], data: Tree): Link[] => {
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
    const label = (node as Node).acronym
    const fontSize = 4
    ctx.font = `${fontSize}px Sans-Serif`
    ctx.beginPath()
    ctx.arc(node.x, node.y, 7, 0, 2 * Math.PI, false)
    ctx.fillStyle = `#1877d2`
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
    const nodes = getFilteredNodes(props.sliderValue, clone(unfilteredData))
    const links = getFilteredLinks(nodes, clone(unfilteredData))
    const tempData = {
      nodes,
      links,
    }
    setData({ ...tempData })
  }, [props.sliderValue])

  React.useEffect(() => {
    const graphInstance = ref.current
    if (graphInstance) {
      graphInstance.d3Force('collision', d3.forceCollide(20))
      //graphInstance.d3Force('link')?.distance(10)
      //graphInstance.d3Force('collide', d3.forceCollide(10))
      graphInstance.zoom(2, 0)
    }
  }, [data])

  return { data, ref, nodeCanvasObject }
}
