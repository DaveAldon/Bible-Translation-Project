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
      label: NavLinks.About,
    },
  ]

  const navigate = (link: string) => {
    window.open(link, '_blank')
  }

  return (
    <div className="w-full p-8 pb-4 flex justify-center items-center">
      <GlassContainer>
        <div className="text-white w-full flex flex-col justify-center items-center p-4">
          <p className="text-2xl font-semibold w-full">
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
      </GlassContainer>
    </div>
  )
}
