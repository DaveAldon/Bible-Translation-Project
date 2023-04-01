import { Translation } from '../../../types/translation'
import json from '../../../public/data/translations.json'

export const getTranslationData = (): Translation[] => {
  return json.translations as Translation[]
}
