'use client'
import { NavLinks } from '@/app/util/links'
import { DropDown } from '../Controls/DropDown'
import {
  AcademicCapIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  EyeIcon,
} from '@heroicons/react/20/solid'
import { GlassContainer } from '../GlassContainer/GlassContainer'

export const CallToActionForm = () => {
  const navigate = (link: string) => {
    // open link in same tab
    window.open(link, '_self')
  }

  return (
    <div className="w-full p-8 pb-4 flex justify-center items-center">
      <GlassContainer>
        <div className="text-white w-full flex flex-col justify-center items-center p-4">
          <p className="text-2xl font-semibold w-full text-center">
            Get started below
          </p>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 w-full items-center justify-center mt-8">
            <button
              type="button"
              onClick={() => {
                navigate(NavLinks.History)
              }}
              className="w-full flex flex-row gap-2 justify-center items-center whitespace-nowrap border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm p-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
            >
              <EyeIcon className="h-6 w-6" />
              <p>
                <b>Origin Tree</b> and
                <b> Timeline</b>
              </p>
            </button>
            <button
              type="button"
              onClick={() => {
                navigate(NavLinks.Translations)
              }}
              className="w-full flex flex-row gap-2 justify-center items-center whitespace-nowrap border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm p-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
            >
              <AcademicCapIcon className="h-6 w-6" />
              <p>
                <b>Description</b> of
                <b> Translations</b>
              </p>
            </button>
            <button
              type="button"
              onClick={() => {
                navigate(NavLinks.About)
              }}
              className="w-full flex flex-row gap-2 justify-center items-center whitespace-nowrap border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm p-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
            >
              <BookOpenIcon className="h-6 w-6" />
              <p>
                <b>About</b> the
                <b> Project</b>
              </p>
            </button>
          </div>
        </div>
      </GlassContainer>
    </div>
  )
}
