import { Slider } from '@mui/material'

const getValueText = (value: number) => {
  if (value < 0) {
    return `${Math.abs(value)} BC`
  }
  return `${value} AD`
}

interface ControlProps {
  onChange: (value: number) => void
  marks: { value: number; label: string }[]
}

export const Controls = (props: ControlProps) => {
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
        defaultValue={props.marks[0].value}
        valueLabelDisplay="on"
        step={null}
        marks={props.marks}
        min={props.marks[0].value}
        max={props.marks[props.marks.length - 1].value}
        onChange={(_e, value) => {
          props.onChange(value as number)
        }}
      />
    </div>
  ) : null
}
