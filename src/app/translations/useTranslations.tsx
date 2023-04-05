import React from 'react'
import { getTranslationData } from '../util/getTranslationData'
import { Bible } from '../../../types/tree'

export const useTranslations = () => {
  const [versionSearch, setVersionSearch] = React.useState('')
  const [translationData, _setTranslationData] = React.useState<Bible[]>(
    getTranslationData().nodes
  )
  const [translations, setTranslations] = React.useState<Bible[]>([])

  React.useEffect(() => {
    const filteredTranslations = translationData.filter((translation) =>
      translation.title.toLowerCase().includes(versionSearch.toLowerCase())
    )
    setTranslations([...filteredTranslations])
  }, [versionSearch])

  return { translations, setVersionSearch }
}
