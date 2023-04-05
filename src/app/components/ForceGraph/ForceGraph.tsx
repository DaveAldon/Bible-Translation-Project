'use client'
import { getTranslationData } from '@/app/util/getTranslationData'
import React from 'react'
import FG2D, { ForceGraphMethods } from 'react-force-graph-2d'
import { SizeMe } from 'react-sizeme'
import { Tree, Node, Link } from '../../../../types/tree'
import * as d3 from 'd3'
import { clone } from '@/app/util/clone'

interface ForceGraph2DProps {
  sliderValue: number
}
export const ForceGraph2D = (props: ForceGraph2DProps) => {
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

  return (
    <SizeMe monitorHeight refreshRate={128}>
      {({ size }) => (
        <FG2D
          ref={ref}
          linkDirectionalParticles={2}
          graphData={data}
          linkColor={() => '#FFFFFF'}
          nodeRelSize={5}
          backgroundColor="#232323"
          width={size.width || 0}
          height={window.innerHeight - 64}
          autoPauseRedraw={false}
          nodeLabel={(node) =>
            `${data && data.nodes.find((n) => n.id === node.id)?.title}`
          }
          /* dagMode="bu"
          dagLevelDistance={10} */
        />
      )}
    </SizeMe>
  )
}
