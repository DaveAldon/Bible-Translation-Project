import React, { memo } from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import { Bible } from '../../../../../types/tree'
import { Category_Colors } from '../../../../../types/categories.enum'
import { hext } from '@davealdon/hext'
import { ChevronDoubleRightIcon, HeartIcon } from '@heroicons/react/20/solid'
import { BibleInteractable } from '../useGraphTree'

export const ActiveGraphNode = memo(
  ({ data }: NodeProps<BibleInteractable>) => {
    let acronymFontSize = '2rem'
    if (data.acronym.length === 4) acronymFontSize = '1.5rem'
    if (data.acronym.length === 5) acronymFontSize = '1.25rem'
    if (data.acronym.length === 6) acronymFontSize = '1rem'

    const outline =
      Category_Colors[data.category as keyof typeof Category_Colors]

    return (
      <div
        className={`px-2 py-2 shadow-md rounded-lg border-2 bg-black`}
        style={{
          borderColor: outline,
          border: `2px solid ${outline}`,
          boxShadow: `0 0 10px ${hext(outline, 50)}`,
        }}
      >
        <div className="flex flex-col justify-center align-middle items-center">
          <div className="rounded-full w-20 h-20 flex justify-center items-center bg-gray-100">
            <div
              className="text-gray-800"
              style={{
                fontSize: acronymFontSize,
                fontWeight: 'bold',
              }}
            >
              {data.acronym}
            </div>
          </div>
          {data.title !== 'God' && (
            <div className="flex justify-center items-center">
              <div className="text-white">{data.title}</div>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            style={{
              outline: 0,
              boxShadow: 'none',
            }}
            className="inline-flex items-center justify-center p-1 text-white hover:text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
            onClick={() => data.onClickExpand(data)}
          >
            <span className="sr-only">Close menu</span>
            <ChevronDoubleRightIcon className="h-8 w-8" aria-hidden="true" />
          </button>
        </div>

        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
      </div>
    )
  }
)

export const InactiveGraphNode = memo(
  ({ data }: NodeProps<BibleInteractable>) => {
    let acronymFontSize = '2rem'
    if (data.acronym.length === 4) acronymFontSize = '1.5rem'
    if (data.acronym.length === 5) acronymFontSize = '1.25rem'
    if (data.acronym.length === 6) acronymFontSize = '1rem'

    const outline =
      Category_Colors[data.category as keyof typeof Category_Colors]

    return (
      <div
        className="px-2 py-2 shadow-md rounded-lg border-2 bg-black opacity-10"
        style={{
          borderColor: outline,
          border: `5px solid ${outline}`,
          boxShadow: `0 0 10px ${outline}`,
        }}
      >
        <div className="flex flex-col justify-center align-middle items-center">
          <div className="rounded-full w-20 h-20 flex justify-center items-center bg-gray-100">
            <div
              className="text-gray-900"
              style={{
                fontSize: acronymFontSize,
              }}
            >
              {data.acronym}
            </div>
          </div>
          {data.title !== 'God' && (
            <div className="flex justify-center items-center">
              <div className="text-white">{data.title}</div>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            style={{
              outline: 0,
              boxShadow: 'none',
            }}
            className="inline-flex items-center justify-center p-1 text-white hover:text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
            onClick={() => data.onClickExpand(data)}
          >
            <span className="sr-only">Close menu</span>
            <ChevronDoubleRightIcon className="h-8 w-8" aria-hidden="true" />
          </button>
        </div>

        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
      </div>
    )
  }
)
