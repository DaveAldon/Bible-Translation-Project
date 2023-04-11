'use client'
import React from 'react'
import FG2D from 'react-force-graph-2d'
import { SizeMe } from 'react-sizeme'
import { useForceGraph } from './useForceGraph'
import { ForceGraph2DProps } from './ForceGraphTypes'
import { hext } from '@davealdon/hext'

export const ForceGraph2D = (props: ForceGraph2DProps) => {
  const { data, ref, nodeCanvasObject } = useForceGraph(props)

  return (
    <SizeMe monitorHeight refreshRate={128}>
      {({ size }) => (
        <FG2D
          ref={ref}
          linkDirectionalParticles={2}
          graphData={data}
          linkColor={() => hext('#FFFFFF', 20)}
          nodeRelSize={10}
          backgroundColor="#232323"
          width={size.width || 0}
          height={window.innerHeight - 64}
          autoPauseRedraw={true}
          linkCurvature={0.05}
          nodeLabel={(node) =>
            `${
              data &&
              data.nodes.find(
                (n: { id: string | number | undefined }) => n.id === node.id
              )?.title
            }`
          }
          dagMode="bu"
          dagLevelDistance={0}
          nodeCanvasObject={nodeCanvasObject}
        />
      )}
    </SizeMe>
  )
}
