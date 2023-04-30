import { BibleNode } from '../../../types/tree'
import { getTranslationData } from './getTranslationData'

export const getDemographicsById = (id: string): BibleNode | undefined => {
  const translationsData = getTranslationData().nodes
  return translationsData.find((node) => node.id === id)
}
