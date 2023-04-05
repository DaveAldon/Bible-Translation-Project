import React from 'react'
import { ForceGraphMethods } from 'react-force-graph-2d'
import { Tree, Node, Link } from '../../../../types/tree'
import { getTranslationData } from '@/app/util/getTranslationData'
import { clone } from '@/app/util/clone'
import d3 from 'd3'
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
      graphInstance.d3Force('collision', d3.forceCollide(40))
      graphInstance.d3Force('link')?.distance(1)
    }
  }, [])

  return { data, ref }
}
