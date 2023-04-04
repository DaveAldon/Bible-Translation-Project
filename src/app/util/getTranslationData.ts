import json from '../../../public/data/bibleTree.json'
import { Tree } from '../../../types/tree'

export const getTranslationData = (): Tree => {
  return json as Tree
}
