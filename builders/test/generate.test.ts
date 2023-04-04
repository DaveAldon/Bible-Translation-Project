import fs from 'fs'
import { generateTree } from '../generateTree'
import { writeToFile } from '../writeToFile'

describe('generate and writeToFile', () => {
  it('results in generated json file', async () => {
    const data = await generateTree()
    await writeToFile(data, './public/data/bibleTree.json')

    const exists = fs.existsSync('./public/data/bibleTree.json')
    expect(exists).toBe(true)
  })
})
