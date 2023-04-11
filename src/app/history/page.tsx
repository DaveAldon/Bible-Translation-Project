'use client'
import dynamic from 'next/dynamic'
import { Controls } from '../components/Controls/Controls'
import React from 'react'
import { useHistory } from './useHistory'

const ForceGraph2D = dynamic(
  () =>
    import('../components/ForceGraph/ForceGraph').then(
      (mod) => mod.ForceGraph2D
    ),
  {
    ssr: false,
  }
)

const History = () => {
  const { sliderValue, marks, onSliderChange, filterName, setFilterName } =
    useHistory()

  return (
    <div className="relative">
      <div className="absolute inset-0 flex z-10 h-fit">
        <Controls
          marks={marks}
          onChange={onSliderChange}
          filterName={filterName}
          setFilterName={setFilterName}
        />
      </div>
      <ForceGraph2D sliderValue={sliderValue} filterCategories={filterName} />
    </div>
  )
}

export default History
