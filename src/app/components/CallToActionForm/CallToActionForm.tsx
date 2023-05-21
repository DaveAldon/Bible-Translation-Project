'use client'
import { NavLinks } from '@/app/util/links'
import { DropDown } from '../Controls/DropDown'
import {
  AcademicCapIcon,
  BookOpenIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleLeftRightIcon,
  EyeIcon,
} from '@heroicons/react/20/solid'

export const CallToActionForm = () => {
  const options = [
    {
      component: (
        <p className="flex flex-row gap-2">
          <EyeIcon className="h-6 w-6" />
          <em>
            <b>see</b>
          </em>
          the history of Bible translations
        </p>
      ),
      label: NavLinks.History,
    },
    {
      component: (
        <p className="flex flex-row gap-2">
          <AcademicCapIcon className="h-6 w-6" />
          <em>
            <b>research</b>
          </em>{' '}
          Bible translations
        </p>
      ),
      label: NavLinks.Translations,
    },
    {
      component: (
        <p className="flex flex-row gap-2">
          <BookOpenIcon className="h-6 w-6" />
          <em>
            <b>learn</b>
          </em>{' '}
          more about this project
        </p>
      ),
      label: NavLinks.Home,
    },
  ]

  const navigate = (link: string) => {
    window.open(link, '_blank')
  }

  return (
    <div className="flex items-center justify-center p-5">
      <div className="rounded-md mx-auto bg-gradient-to-r p-[2px] from-[#346dde] via-[#9320fe] to-[#346dde]">
        <div className="flex flex-col justify-between h-full bg-white text-white rounded-md">
          <div className="flex flex-col w-full rounded-md items-center justify-center text-white bg-gray-800 p-4">
            <p className="text-2xl font-semibold">
              Not sure where to start? Select an option below:
            </p>

            <div className="flex flex-row gap-4 w-full items-center justify-center mt-8">
              <ChatBubbleLeftRightIcon className="h-6 w-6" />
              <p className="text-xl">I'd like to</p>
              <DropDown
                dropDownTitle={'...'}
                filterName={''}
                setFilterName={navigate}
                values={options}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
