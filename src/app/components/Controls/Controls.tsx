import { Slider, TextField, Typography } from '@mui/material'
import { getBlurStyle } from '@/app/styles/specialEffects'
import { getYearText } from '@/app/util/years'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid'

interface ControlProps {
  onChange: (value: number) => void
  marks: { value: number; label: string }[]
  filterName: string
  setFilterName: (value: string) => void
  showTooltips: boolean
  setShowTooltips: (value: boolean) => void
}
export const Controls = (props: ControlProps) => {
  const firstElement = props.marks[0]
  const lastElement = props.marks[props.marks.length - 1]

  return props.marks.length > 0 ? (
    <div
      className="flex flex-row gap-4 w-full bg-gray-800 px-2 py-2 pr-12 justify-center items-center"
      style={getBlurStyle()}
    >
      <button
        data-tooltip-id="help-button-tooltip"
        data-tooltip-content="Hide or show these tooltips"
        type="button"
        onClick={() => {
          props.setShowTooltips(!props.showTooltips)
        }}
        className="whitespace-nowrap w-[200px] border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm p-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
      >
        <div className="flex flex-row justify-center items-center font-bold">
          <QuestionMarkCircleIcon className="h-10 w-10 mr-2" />
          <p>How does this work?</p>
        </div>
      </button>
      <TextField
        data-tooltip-id="search-tooltip"
        data-tooltip-content="Enter the name of a translation to highlight it"
        id="outlined-basic"
        label="Search"
        InputLabelProps={{
          style: { color: 'white' },
        }}
        variant="outlined"
        style={{
          width: 200,
        }}
        inputProps={{ style: { color: 'white' } }}
        sx={{ color: 'white', borderColor: 'white' }}
        value={props.filterName}
        onChange={(e) => {
          props.setFilterName(e.target.value)
        }}
      />
      <div className="w-full text-white">
        <Typography
          id="input-slider"
          data-tooltip-id="year-slider-tooltip"
          data-tooltip-content="Change the value along the slider to show translations that existed at that time"
          gutterBottom
        >
          Year Range
        </Typography>
        <ReactTooltip
          id="year-slider-tooltip"
          offset={50}
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
            props.onChange(value as number)
          }}
        />
      </div>

      <ReactTooltip
        id="search-tooltip"
        place="bottom"
        variant="error"
        isOpen={props.showTooltips}
      />
      <ReactTooltip
        id="help-button-tooltip"
        place="top"
        variant="error"
        isOpen={props.showTooltips}
      />
      {/* <MultiSelect {...props} /> */}
    </div>
  ) : null
}
