import { Slider, TextField, Typography } from '@mui/material'
import { getBlurStyle } from '@/app/styles/specialEffects'
import { getYearText } from '@/app/util/years'
import { Checkbox } from '@nextui-org/react'

interface ControlProps {
  onChange: (value: number) => void
  marks: { value: number; label: string }[]
  filterName: string
  setFilterName: (value: string) => void
  fitViewToggle: boolean
  setFitViewToggle: (value: boolean) => void
}

export const Controls = (props: ControlProps) => {
  const firstElement = props.marks[0]
  const lastElement = props.marks[props.marks.length - 1]

  return props.marks.length > 0 ? (
    <div
      className="flex flex-row gap-10 w-full bg-gray-800 px-10 py-2 justify-center items-center"
      style={getBlurStyle()}
    >
      <TextField
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
      <Checkbox
        color="gradient"
        isSelected={props.fitViewToggle}
        onChange={() => {
          props.setFitViewToggle(!props.fitViewToggle)
        }}
        style={{ width: 150 }}
      >
        <p className="text-white text-base">Fit View</p>
      </Checkbox>
      <div className="w-full text-white">
        <Typography id="input-slider" gutterBottom>
          Drag the slider to show translations throughout history
        </Typography>

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
      {/* <MultiSelect {...props} /> */}
    </div>
  ) : null
}
