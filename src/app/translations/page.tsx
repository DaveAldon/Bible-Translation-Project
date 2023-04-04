'use client'

import React from 'react'
import { getTranslationData } from '../util/getTranslationData'
import { Bible } from '../../../types/tree'

const TranslationComponent = ({ translation }: { translation: Bible }) => {
  return (
    <div className="p-2 w-full">
      <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
        <img
          alt="team"
          className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
          src={translation.image}
        />
        <div className="flex-grow">
          <h2 className="text-white title-font font-medium">
            {translation.title}
          </h2>
          <p className="text-gray-500">{translation.description}</p>
        </div>
      </div>
    </div>
  )
}

const Translations = () => {
  const [versionSearch, setVersionSearch] = React.useState('')
  const [translationData, _setTranslationData] = React.useState<Bible[]>(
    getTranslationData().nodes
  )
  const [translations, setTranslations] = React.useState<Bible[]>([])

  React.useEffect(() => {
    // filter translations by the versionSearch
    const filteredTranslations = translationData.filter((translation) =>
      translation.title.toLowerCase().includes(versionSearch.toLowerCase())
    )
    setTranslations([...filteredTranslations])
  }, [versionSearch])

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
              Translations
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Sample text
            </p>
            <div className="mb-4 w-1/3">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="version"
                type="text"
                placeholder="Version"
                onChange={(e) => setVersionSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2">
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
