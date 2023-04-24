import React, { memo } from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import { Bible } from '../../../../../types/tree'

export const ActiveGraphNode = memo(({ data }: NodeProps<Bible>) => {
  return (
    <div className="px-2 py-2 shadow-md rounded-md border-2 border-stone-400">
      <div className="flex flex-col justify-center align-middle items-center">
        <div className="rounded-full w-20 h-20 flex justify-center items-center bg-gray-100">
          <div className="text-gray-500">{data.acronym}</div>
        </div>
        {data.title !== 'God' && (
          <div className="flex justify-center items-center">
            <div className="text-gray-500">{data.title}</div>
          </div>
        )}
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
})

export const InactiveGraphNode = memo(({ data }: NodeProps<Bible>) => {
  return (
    <div className="px-2 py-2 shadow-md rounded-md border-2 border-stone-400 opacity-10">
      <div className="flex flex-col justify-center align-middle items-center">
        <div className="rounded-full w-20 h-20 flex justify-center items-center bg-gray-100">
          <div className="text-gray-500">{data.acronym}</div>
        </div>
        <div className="flex justify-center items-center">
          <div className="text-gray-500">{data.title}</div>
        </div>
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
})
