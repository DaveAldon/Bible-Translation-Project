'use client'
import { Fragment } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, SetStateAction } from 'react'
import { Bible, BibleNode } from '../../../../types/tree'
import { getBlurStyle } from '@/app/styles/specialEffects'
import { getDemographicsById } from '../../util/getDemographic'

interface BibleModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  closeModal: (value: boolean) => void
  data: BibleNode | null
  navigateToNode: (node: BibleNode) => void
}

export const BibleModal = (props: BibleModalProps) => {
  if (!props.data) return null
  const { data } = props.data

  return (
    <>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={props.closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-end p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-black p-4 text-left align-middle shadow-xl transition-all"
                  style={getBlurStyle()}
                >
                  <div className="absolute top-0 right-0">
                    <button
                      type="button"
                      style={{
                        outline: 0,
                        boxShadow: 'none',
                      }}
                      className="inline-flex items-center justify-center p-3 text-white hover:text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
                      onClick={() => {
                        props.closeModal(false)
                      }}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <h1 className="text-3xl text-center">{data.title}</h1>
                  <div className="flex flex-col justify-center">
                    <div className="flex justify-center items-center w-full">
                      <img src={data.image} className="rounded-lg h-48 m-2" />
                    </div>
                    <BibleDemographicsTable {...props} />
                    <div className="text-left text-sm text-grey-dark m-2">
                      {data.description.split('~').map((paragraph) => {
                        return <p className="mb-4">{paragraph}</p>
                      })}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export const BibleDemographicsTable = (props: BibleModalProps) => {
  if (!props.data || props.data.data.title === 'God') return null
  const { data } = props.data

  const Row = ({ title, children }: { title: string; children: any }) => {
    return (
      <tr className="border-b bg-black border-gray-700 bg-opacity-25 whitespace-nowrap">
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
      <table className="w-full text-sm text-left text-gray-400">
        <tbody>
          <Row title="Year Published">{data.year}</Row>
          <Row title="Translation Sources">
            <ParentButtons {...props} />
          </Row>
          <Row title="View for Free Online">
            <LinkButton data={data} />
          </Row>
        </tbody>
      </table>
    </div>
  )
}

export const ParentButtons = (props: BibleModalProps) => {
  if (!props.data) return null
  const { data } = props.data
  return (
    <div className="flex flex-row">
      {data.parents.split(',').map((parent) => {
        const parentNodeRef = getDemographicsById(parent)
        if (!parentNodeRef) return null
        return <TranslationSourceButton props={props} nodeRef={parentNodeRef} />
      })}
    </div>
  )
}

export const TranslationSourceButton = ({
  props,
  nodeRef,
}: {
  props: BibleModalProps
  nodeRef: BibleNode
}) => {
  if (!props.data) return null

  return (
    <button
      type="button"
      onClick={() => {
        props.navigateToNode(nodeRef)
      }}
      className=" text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
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
      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
    >
      {data.link ? data.link.split('/')[2] : 'Unavailable'}
    </button>
  )
}
