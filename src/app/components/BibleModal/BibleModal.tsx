'use client'
import { useState, Fragment, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { Dialog, Transition, Menu } from '@headlessui/react'
//import 'react-toastify/dist/ReactToastify.css'
import { Dispatch, SetStateAction } from 'react'
import { Bible, BibleNode } from '../../../../types/tree'
import { getBlurStyle } from '@/app/styles/specialEffects'
import { getDemographicsById } from '../../util/getDemographic'
interface BibleModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  closeModal: (value: boolean) => void
  data: BibleNode | null
}

export const BibleModal = ({
  isOpen,
  setIsOpen,
  closeModal,
  data,
}: BibleModalProps) => {
  if (!data) return null
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
                  className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-black p-12 text-left align-middle shadow-xl transition-all"
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
                        closeModal(false)
                      }}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <h1 className="mb-8 text-3xl text-center">
                    {data.data.title}
                  </h1>
                  <div className="flex flex-col items-center justify-center">
                    <img src={data.data.image} className="rounded-lg h-48" />
                    {/* <button
                      type="button"
                      onClick={() => {
                        window.open(data.data.link, '_blank')
                      }}
                      className="mt-6 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                      Read it Online
                    </button> */}
                    <BibleDemographicsTable data={data.data} />
                    <div className="text-left text-sm text-grey-dark mt-4">
                      {data.data.description}
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

export const BibleDemographicsTable = ({ data }: { data: Bible }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Year Published
            </th>
            <td className="px-6 py-4">{data.year}</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Translation Sources
            </th>
            <td className="px-6 py-4">
              <ParentButtons data={data} />
            </td>
          </tr>
          <tr className="bg-white dark:bg-gray-800">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              View for Free Online
            </th>
            <td className="px-6 py-4">
              <LinkButton data={data} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export const ParentButtons = ({ data }: { data: Bible }) => {
  return (
    <div className="flex flex-row">
      {data.parents.split(',').map((parent) => {
        const parentNodeRef = getDemographicsById(parent)
        if (!parentNodeRef) return null
        return <TranslationSourceButton data={parentNodeRef.data} />
      })}
    </div>
  )
}

export const TranslationSourceButton = ({ data }: { data: Bible }) => {
  return (
    <button
      type="button"
      onClick={() => {
        window.open(data.link, '_blank')
      }}
      className="mt-6 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
    >
      {data.acronym}
    </button>
  )
}

export const LinkButton = ({ data }: { data: Bible }) => {
  return (
    <button
      type="button"
      onClick={() => {
        window.open(data.link, '_blank')
      }}
      className="mt-6 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
    >
      {data.link ? data.link.split('/')[2] : 'Unavailable'}
    </button>
  )
}
