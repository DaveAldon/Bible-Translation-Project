import { Slider } from '@mui/material'
import { MultiSelect } from './MultiSelect'

const getValueText = (value: number) => {
  if (value < 0) {
    return `${Math.abs(value)} BC`
  }
  return `${value} AD`
}

interface ControlProps {
  onChange: (value: number) => void
  marks: { value: number; label: string }[]
  filterName: string[]
  setFilterName: (value: string[]) => void
}

export const Controls = (props: ControlProps) => {
  const firstElement = props.marks[0]
  const lastElement = props.marks[props.marks.length - 1]

  return props.marks.length > 0 ? (
    <div
      className="flex w-full bg-gray-800 p-10"
      style={{
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      }}
    >
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
      <MultiSelect {...props} />
    </div>
  ) : null
}
