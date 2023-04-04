import fs from 'fs'
import { Tree } from '../types/tree'

export const writeToFile = async (
  data: Tree,
  destination: string
): Promise<void> => {
  await fs.promises.writeFile(destination, JSON.stringify(data, null, 2))
}
