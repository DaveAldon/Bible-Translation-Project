import { Slider, Typography } from '@mui/material'
import { getBlurStyle } from '@/app/styles/specialEffects'
import { getYearText } from '@/app/util/years'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { SearchResults } from './SearchResults'

interface ControlProps {
  onSliderChange: (value: number) => void
  marks: { value: number; label: string }[]
  filterName: string
  setFilterName: (value: string) => void
  showTooltips: boolean
}
export const Controls = (props: ControlProps) => {
  const firstElement = props.marks[0]
  const lastElement = props.marks[props.marks.length - 1]

  return props.marks.length > 0 ? (
    <div
      className="flex flex-row gap-4 w-full bg-gray-800 px-2 py-2 pr-12 justify-center items-center text-white"
      style={getBlurStyle()}
    >
      <SearchResults
        filterName={props.filterName}
        setFilterName={props.setFilterName}
      />
      <div className="w-full text-white">
        <Typography
          id="input-slider"
          data-tooltip-id="year-slider-tooltip"
          data-tooltip-content="Change the value along the slider to show translations that existed at that time"
          gutterBottom
        >
          Timeline
        </Typography>
        <ReactTooltip
          id="year-slider-tooltip"
          offset={0}
          place="top"
          variant="error"
          isOpen={props.showTooltips}
        />
        <Slider
          aria-label="Restricted values"
          getAriaValueText={getYearText}
          valueLabelFormat={getYearText}
          defaultValue={lastElement.value}
          valueLabelDisplay="on"
          step={null}
          marks={props.marks}
          min={firstElement.value}
          max={lastElement.value}
          onChange={(_e, value) => {
            props.onSliderChange(value as number)
          }}
        />
      </div>

      <ReactTooltip
        id="search-tooltip"
        place="bottom"
        variant="error"
        isOpen={props.showTooltips}
      />
      {/* <MultiSelect {...props} /> */}
    </div>
  ) : null
}
