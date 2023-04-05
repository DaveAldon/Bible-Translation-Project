'use client'
import React from 'react'
import FG2D from 'react-force-graph-2d'
import { SizeMe } from 'react-sizeme'
import { useForceGraph } from './useForceGraph'
import { ForceGraph2DProps } from './ForceGraphTypes'

export const ForceGraph2D = (props: ForceGraph2DProps) => {
  const { data, ref } = useForceGraph(props)

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
