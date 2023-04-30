'use client'
import { useState, Fragment, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { Dialog, Transition, Menu } from '@headlessui/react'
//import 'react-toastify/dist/ReactToastify.css'
import { Dispatch, SetStateAction } from 'react'
import { BibleNode } from '../../../../types/tree'
import { getBlurStyle } from '@/app/styles/specialEffects'

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
          {/* <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child> */}

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
                  <img src={data.data.image} />
                  <a
                    target="_blank"
                    href={data.data.link}
                    className="text-center text-sm text-grey-dark mt-4"
                  >
                    Read it Online
                  </a>
                  <div className="text-center text-sm text-grey-dark mt-4">
                    {data.data.description}
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
