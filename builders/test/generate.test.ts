import fs from 'fs'
import { generateTree } from '../generateTree'
import { writeToFile } from '../writeToFile'
import { TestTree } from '@/app/components/ForceGraph/Tree'

describe('generate and writeToFile', () => {
  it('results in generated json file', async () => {
    // add longer timeout to allow for file write
    jest.setTimeout(10000)
    const data = await generateTree()
    await writeToFile(data, './public/data/bibleTree.json')

    const exists = fs.existsSync('./public/data/bibleTree.json')
    expect(exists).toBe(true)
  })
  it('test tree', async () => {
    const result = TestTree()
  })
})
