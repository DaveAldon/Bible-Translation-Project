import { Edge } from 'reactflow'

export interface Bible {
  id: string
  title: string
  parents: string
  description: string
  image: string
  year: string
  acronym: string
  category: string
  filter: string
  link: string
  authors: string
  source: string
  copies: string
}

export interface Tree {
  nodes: BibleNode[]
  edges: Edge[]
}

export interface BibleNode {
  id: string
  data: Bible
  position: {
    x: number
    y: number
  }
  style?: {
    [key: string]: string
  }
  filterStyle: boolean
}
