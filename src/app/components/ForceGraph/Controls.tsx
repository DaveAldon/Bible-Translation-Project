import { Slider } from '@mui/material'

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
        getAriaValueText={(value) => `${value}s`}
        defaultValue={props.marks[0].value}
        valueLabelDisplay="on"
        //marks={props.marks}
        valueLabelFormat={(value) => `${value}s`}
        step={10}
        min={props.marks[0].value}
        max={props.marks[props.marks.length - 1].value}
        onChange={(_e, value) => {
          props.onChange(value as number)
        }}
      />
    </div>
  ) : null
}
