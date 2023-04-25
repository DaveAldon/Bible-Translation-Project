import { Slider, TextField, Typography } from '@mui/material'
import { hext } from '@davealdon/hext'

const getValueText = (value: number) => {
  if (value < 0) {
    return `${Math.abs(value)} BC`
  }
  return `${value} AD`
}

interface ControlProps {
  onChange: (value: number) => void
  marks: { value: number; label: string }[]
  filterName: string
  setFilterName: (value: string) => void
}

export const Controls = (props: ControlProps) => {
  const firstElement = props.marks[0]
  const lastElement = props.marks[props.marks.length - 1]

  return props.marks.length > 0 ? (
    <div
      className="flex flex-row gap-10 w-full bg-gray-800 px-10 py-2 justify-center items-center"
      style={{
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        backgroundColor: hext('#808080', 30),
      }}
    >
      <TextField
        id="outlined-basic"
        label="Search Translations"
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
      <div className="w-full">
        <Typography id="input-slider" gutterBottom>
          Drag the slider to show translations throughout history
        </Typography>

        <Slider
          aria-label="Restricted values"
          getAriaValueText={getValueText}
          valueLabelFormat={getValueText}
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
