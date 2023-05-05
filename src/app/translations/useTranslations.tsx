import React from 'react'
import { getTranslationData } from '../util/getTranslationData'
import { BibleNode } from '../../../types/tree'

export const useTranslations = () => {
  const [versionSearch, setVersionSearch] = React.useState('')
  const [translationData, _setTranslationData] = React.useState<BibleNode[]>(
    getTranslationData().nodes
  )
  const [translations, setTranslations] = React.useState<BibleNode[]>([])

  React.useEffect(() => {
    const filteredTranslations = translationData.filter((translation) => {
      return (
        translation.data.title
          .toLowerCase()
          .includes(versionSearch.toLowerCase()) ||
        translation.data.acronym
          .toLowerCase()
          .includes(versionSearch.toLowerCase())
      )
    })
    setTranslations([...filteredTranslations])
  }, [versionSearch])

  return { translations, setVersionSearch }
}
