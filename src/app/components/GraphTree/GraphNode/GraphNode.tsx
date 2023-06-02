import React, { memo } from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import { hext } from '@davealdon/hext'
import { getYearText } from '@/app/util/years'
import { Bible } from '../../../../../types/tree'
import { getColorFromSpectrum } from '../../../util/spectrums'

const GraphNode = ({ data, active }: { data: Bible; active: boolean }) => {
  let acronymFontSize = '2rem'
  if (data.acronym.length === 4) acronymFontSize = '1.5rem'
  if (data.acronym.length === 5) acronymFontSize = '1.25rem'
  if (data.acronym.length >= 6) acronymFontSize = '1rem'

  const outline =
    data.title === 'God'
      ? '#FFFFFF'
      : getColorFromSpectrum(parseInt(data.spectrum))

  return (
    <div
      className={`px-2 py-2 shadow-md rounded-lg border-2 bg-black`}
      style={{
        borderColor: outline,
        border: `2px solid ${outline}`,
        boxShadow: `0 0 10px ${hext(outline, 50)}`,
        opacity: active ? 1 : 0.1,
        height: data.title === 'God' ? '102px' : '200px',
        width: data.title === 'God' ? '120px' : '175px',
      }}
    >
      <div className="flex flex-col justify-center align-middle items-center">
        <div className="rounded-full w-20 h-20 flex justify-center items-center bg-gray-100 mb-2">
          <div
            className="text-black"
            style={{
              fontSize: acronymFontSize,
              fontWeight: 'bold',
            }}
          >
            {data.acronym}
          </div>
        </div>
        {data.title !== 'God' && (
          <div className="flex justify-center items-center text-center h-[75px]">
            <div className="text-white">{data.title}</div>
          </div>
        )}
      </div>
      {data.title === 'God' ? null : (
        <div className="flex justify-center font-bold">
          <p>{getYearText(parseInt(data.year))}</p>
        </div>
      )}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export const ActiveGraphNode = memo(({ data }: NodeProps<Bible>) => {
  return <GraphNode data={data} active={true} />
})

export const InactiveGraphNode = memo(({ data }: NodeProps<Bible>) => {
  return <GraphNode data={data} active={false} />
})
