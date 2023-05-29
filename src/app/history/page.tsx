'use client'
import { Controls } from '../components/Controls/Controls'
import React from 'react'
import { useHistory } from './useHistory'
import { GraphTree } from '../components/GraphTree/GraphTree'

const History = () => {
  const history = useHistory()

  return (
    <div className="relative">
      <div className="absolute inset-0 flex z-10 h-fit">
        <Controls
          marks={history.marks}
          onChange={history.onSliderChange}
          filterName={history.filterName}
          setFilterName={history.setFilterName}
          showTooltips={history.showTooltips}
          setShowTooltips={history.setShowTooltips}
        />
      </div>
      <GraphTree {...history} />
    </div>
  )
}

export default History
