import { Tooltip as ReactTooltip } from 'react-tooltip'

interface SpectrumInfoProps {
  spectrum: number
  showTooltips: boolean
}
export const SpectrumInfo = (props: SpectrumInfoProps) => {
  const position =
    props.spectrum === 300
      ? 'left'
      : props.spectrum === 200
      ? 'center'
      : 'right'
  const spectrumTitle =
    props.spectrum === 300
      ? 'Literal'
      : props.spectrum === 200
      ? 'Author Intent'
      : 'Paraphrase'
  return (
    <div className="flex flex-col gap-4 justify-center align-middle items-center w-full">
      <div
        style={{
          justifyContent: position,
        }}
        className="flex items-center w-full"
      >
        <p
          data-tooltip-id="spectrum-tooltip"
          data-tooltip-content="Where the translation falls on the interpretation spectrum"
        >
          {spectrumTitle}
        </p>
      </div>
      <div
        style={{
          justifyContent: position,
        }}
        className="w-full h-4 flex items-center relative overflow-hidden rounded-lg"
      >
        <div className="mx-1 w-[15px] h-[15px] absolute rounded-lg flex justify-center items-center bg-black">
          <div className="w-[10px] h-[10px] rounded-lg bg-white" />
        </div>
        <img className="w-full" src="/assets/images/spectrum-bar.png" />
      </div>
      <ReactTooltip
        id="spectrum-tooltip"
        place="bottom"
        variant="error"
        isOpen={props.showTooltips}
      />
    </div>
  )
}
