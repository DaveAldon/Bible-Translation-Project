export interface Bible {
  id: string
  title: string
  parents: string
  description: string
  image: string
  year: string
}

export interface Node extends Bible {}

export interface Link {
  source: string
  target: string
}

export interface Tree {
  nodes: Node[]
  links: Link[]
}
