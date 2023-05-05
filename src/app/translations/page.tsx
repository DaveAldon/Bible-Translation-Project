'use client'

import React from 'react'
import { BibleNode } from '../../../types/tree'
import { useTranslations } from './useTranslations'
import { getYearText } from '../util/years'

const TranslationComponent = ({ translation }: { translation: BibleNode }) => {
  return (
    <div className="p-2 w-full">
      <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
        <img
          alt="team"
          className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
          src={translation.data.image}
        />
        <div className="flex-grow">
          <div className="flex justify-between mb-2">
            <h2 className="text-white title-font font-medium">
              {translation.data.title !== 'God'
                ? `${translation.data.acronym} - `
                : ''}
              {translation.data.title}
            </h2>
            <em className="text-white mr-4">
              {translation.data.title !== 'God'
                ? ` ${getYearText(parseInt(translation.data.year))}`
                : ''}
            </em>
          </div>
          <p className="text-gray-500">
            {translation.data.description.split('~').map((paragraph) => {
              return <p className="mb-4">{paragraph}</p>
            })}
          </p>
        </div>
      </div>
    </div>
  )
}

const Translations = () => {
  const { translations, setVersionSearch } = useTranslations()

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="md:container px-4 py-4 md:mx-auto">
          <div className="flex flex-col text-center w-full mb-4 justify-center items-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
              All Translations
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Browse all Bible translations by scrolling through the list, or
              filtering them by name or acronym via the search bar below.
            </p>
            <div className="mt-4 w-1/3">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-4 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="version"
                type="text"
                placeholder="Version"
                onChange={(e) => setVersionSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1">
            {translations.map((translation) => (
              <TranslationComponent
                key={translation.id}
                translation={translation}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Translations
