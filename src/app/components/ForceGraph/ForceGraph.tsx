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
  // get height/width of screen
  const [height, setHeight] = React.useState(0)
  const [width, setWidth] = React.useState(0)
  React.useEffect(() => {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)
  }, [window.innerHeight, window.innerWidth])

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
