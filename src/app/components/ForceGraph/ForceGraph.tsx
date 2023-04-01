'use client'
import React from 'react'
import { ForceGraph2D as FG2D } from 'react-force-graph'

function genRandomTree(N = 50, reverse = false) {
  return {
    nodes: [...Array(N).keys()].map((i) => ({ id: i })),
    links: [...Array(N).keys()]
      .filter((id) => id)
      .map((id) => ({
        [reverse ? 'target' : 'source']: id,
        [reverse ? 'source' : 'target']: Math.round(Math.random() * (id - 1)),
      })),
  }
}

export const ForceGraph2D = () => {
  const [data, setData] = React.useState(genRandomTree())
  return (
    <FG2D
      linkDirectionalParticles={2}
      graphData={data}
      linkColor={() => '#FFFFFF'}
      nodeRelSize={5}
      backgroundColor="#232323"
    />
  )
}
