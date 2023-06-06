import { motion } from 'framer-motion'
import { Bible, BibleNode } from '../../../../types/tree'
import { FireIcon, ShareIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Dispatch, SetStateAction } from 'react'
import { getDemographicsById } from '@/app/util/getDemographic'
import { getYearText } from '@/app/util/years'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { SpectrumInfo } from '../SpectrumInfo/SpectrumInfo'

export const BibleDemographicsTable = (props: BibleModalProps) => {
  if (!props.data || props.data.data.title === 'God') return null
  const { data } = props.data

  const Row = ({ title, children }: { title: string; children: any }) => {
    return (
      <tr className="border-b bg-gray-800 border-gray-700 bg-opacity-25 whitespace-nowrap">
        <th
          scope="row"
          className="px-4 py-4 font-medium whitespace-nowrap text-white"
        >
          {title}
        </th>
        <td className="px-4 py-4 overflow-clip whitespace-nowrap">
          {children}
        </td>
      </tr>
    )
  }

  return (
    <div className="relative rounded-lg overflow-x-auto">
      <div className="flex whitespace-nowrap items-center justify-center p-4 border-b bg-gray-800 border-gray-700 bg-opacity-25 w-full">
        <SpectrumInfo
          {...props}
          spectrum={parseInt(props.data.data.spectrum)}
        />
      </div>

      <table className="w-full text-sm text-left text-gray-400">
        <tbody>
          <Row title="Year Published">{getYearText(parseInt(data.year))}</Row>
          <Row title="Translation Sources">
            <ParentButtons {...props} />
          </Row>
          {data.source !== undefined ? (
            <Row title="View for Free Online">
              <LinkButton data={data} />
            </Row>
          ) : null}
        </tbody>
      </table>
      <div className="flex whitespace-nowrap items-center justify-center p-4 border-b bg-gray-800 border-gray-700 bg-opacity-25 w-full">
        <ActivatePathButton {...props} />
        <ResetPathsButton {...props} />
      </div>
    </div>
  )
}

export const ParentButtons = (props: BibleModalProps) => {
  if (!props.data) return null
  const { data } = props.data
  return (
    <div className="flex flex-row">
      {data.parents.split(',').map((parent, index) => {
        const parentNodeRef = getDemographicsById(parent)
        if (!parentNodeRef) return null
        return (
          <TranslationSourceButton
            key={index}
            id={index}
            props={props}
            nodeRef={parentNodeRef}
          />
        )
      })}
    </div>
  )
}

export const TranslationSourceButton = ({
  props,
  nodeRef,
  id,
}: {
  props: BibleModalProps
  nodeRef: BibleNode
  id: number
}) => {
  if (!props.data) return null
  return (
    <button
      data-tooltip-id={id === 0 ? 'source-button-tooltip' : ''}
      data-tooltip-content={
        id === 0
          ? 'Takes you directly to a given source material for this translation'
          : ''
      }
      type="button"
      onClick={() => {
        props.navigateToNode(nodeRef)
      }}
      className="ml-4 border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
    >
      {nodeRef.data.title}
    </button>
  )
}

export const LinkButton = ({ data }: { data: Bible }) => {
  return (
    <button
      type="button"
      onClick={() => {
        data.link ? window.open(data.link, '_blank') : null
      }}
      className="ml-4 border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
    >
      {data.link ? data.link.split('/')[2] : 'Unavailable'}
    </button>
  )
}

export const ActivatePathButton = (props: BibleModalProps) => {
  return (
    <button
      data-tooltip-id="activate-button-tooltip"
      data-tooltip-content="Highlights only translations that are source material for this translation"
      type="button"
      onClick={() => {
        if (props.data) props.activatePath(props.data)
      }}
      className="ml-4 border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
    >
      <div className="flex flex-row justify-center items-center">
        <ShareIcon className="h-4 w-4 inline-block mr-2" />
        <p>Show Paths</p>
      </div>
    </button>
  )
}

export const ResetPathsButton = (props: BibleModalProps) => {
  return (
    <button
      data-tooltip-id="reset-button-tooltip"
      data-tooltip-content="Resets all translation paths to show everything"
      type="button"
      onClick={() => {
        if (props.data) props.resetPaths()
      }}
      className="ml-4 border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
    >
      <div className="flex flex-row justify-center items-center">
        <FireIcon className="h-4 w-4 inline-block mr-2" />
        <p>Reset Paths</p>
      </div>
    </button>
  )
}

interface BibleModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  closeModal: (value: boolean) => void
  data: BibleNode | null
  navigateToNode: (node: BibleNode) => void
  activatePath: (node: BibleNode) => void
  resetPaths: () => void
  showTooltips: boolean
}
export const InfoModal = (props: BibleModalProps) => {
  if (!props.data || !props.data.data) return null

  const menuVariants = {
    open: {
      opacity: 1,
      x: 0,
    },
    closed: {
      opacity: 0,
      x: '-100%',
    },
  }

  const Overlay = () => {
    if (!props.data || !props.data.data) return null
    return (
      <motion.div
        animate={props.isOpen ? 'open' : 'closed'}
        variants={menuVariants}
        className="fixed right-0 left-0 sm:left-auto bottom-0 top-16 sm:top-28 m-0 sm:mt-10 z-20 overflow-y-scroll p-4 rounded-l-lg sm:w-1/2 md:max-w-xl text-white"
        style={{
          //height: `calc(100vh - 10px)`,
          borderRadius: '10px',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <div className="">
          <div className="absolute top-0 right-0">
            <button
              data-tooltip-id="close-button-tooltip"
              data-tooltip-content="Closes the translation information popup"
              type="button"
              style={{
                outline: 0,
                boxShadow: 'none',
              }}
              className="inline-flex items-center justify-center p-3 text-white hover:text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              onClick={() => {
                props.closeModal(true)
              }}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <h1 className="text-3xl text-center">{props.data.data.title}</h1>
          <div className="flex flex-col justify-center">
            <div className="flex justify-center items-center w-full">
              <img
                src={props.data.data.image}
                className="rounded-lg h-48 m-2"
              />
            </div>
            <BibleDemographicsTable {...props} />
            <div className="text-left text-sm text-grey-dark m-2">
              {props.data.data.description
                .split('~')
                .map((paragraph, index) => {
                  return (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  )
                })}
            </div>
          </div>
        </div>
        <ReactTooltip
          id="activate-button-tooltip"
          place="top"
          variant="error"
          isOpen={props.showTooltips}
        />
        <ReactTooltip
          id="reset-button-tooltip"
          place="bottom"
          variant="error"
          isOpen={props.showTooltips}
        />
        <ReactTooltip
          id="close-button-tooltip"
          place="bottom"
          variant="error"
          isOpen={props.showTooltips}
        />
        <ReactTooltip
          id="source-button-tooltip"
          place="top"
          variant="error"
          isOpen={props.showTooltips}
        />
      </motion.div>
    )
  }

  return props.isOpen ? <Overlay /> : null
}
