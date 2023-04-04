import { Bible } from '../types/tree'
import { getTreeData } from './lib/googlesheets'

export const getTree = async (): Promise<{ bibles: Bible[] }> => {
  const bibles: Bible[] = await getTreeData()
  return { bibles }
}
