'use client'
import { getTranslationData } from '@/app/util/getTranslationData'
import React from 'react'
import FG2D, { ForceGraphMethods } from 'react-force-graph-2d'
import { SizeMe } from 'react-sizeme'
import { Tree } from '../../../../types/tree'
import * as d3 from 'd3'

export const ForceGraph2D = () => {
  const [data, _setData] = React.useState<Tree>(getTranslationData())
  const ref = React.useRef<ForceGraphMethods>()

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
          autoPauseRedraw={true}
          nodeLabel={(node) =>
            `${data.nodes.find((n) => n.id === node.id)?.title}`
          }
          /* dagMode="bu"
          dagLevelDistance={10} */
        />
      )}
    </SizeMe>
  )
}
