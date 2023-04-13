'use client'
import { Controls } from '../components/Controls/Controls'
import React from 'react'
import { useHistory } from './useHistory'
import { GraphTree } from '../components/GraphTree/GraphTree'

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
      <GraphTree />
    </div>
  )
}

export default History
