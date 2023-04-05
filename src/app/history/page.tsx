'use client'
import dynamic from 'next/dynamic'
import { Controls } from '../components/ForceGraph/Controls'
import { getTranslationData } from '../util/getTranslationData'
import React from 'react'

const ForceGraph2D = dynamic(
  () =>
    import('../components/ForceGraph/ForceGraph').then(
      (mod) => mod.ForceGraph2D
    ),
  {
    ssr: false,
  }
)

interface Mark {
  value: number
  label: string
}

const History = () => {
  const translationData = getTranslationData()
  const [sliderValue, setSliderValue] = React.useState(
    Math.min(...translationData.nodes.map((node) => parseInt(node.year)))
  )
  const [marks, setMarks] = React.useState<Mark[]>([])

  React.useEffect(() => {
    const tempMarks: Mark[] = []
    getTranslationData().nodes.forEach((node, index) => {
      const nodeYear = parseInt(node.year)
      if (tempMarks.find((mark) => mark.value === nodeYear)) return
      tempMarks.push({
        value: nodeYear,
        label: `${node.year}`,
      })
    })
    setMarks([...tempMarks.sort((a, b) => a.value - b.value)])
  }, [])

  const onSliderChange = (value: number) => {
    setSliderValue(value)
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 flex z-10 h-fit">
        <Controls marks={marks} onChange={onSliderChange} />
      </div>
      <ForceGraph2D sliderValue={sliderValue} />
    </div>
  )
}

export default History
