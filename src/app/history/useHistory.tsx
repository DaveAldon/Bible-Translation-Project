import React from 'react'
import { getTranslationData } from '../util/getTranslationData'
import { Mark } from '../components/GraphTree/GraphTreeTypes'

export const useHistory = () => {
  const translationData = getTranslationData()
  const [sliderValue, setSliderValue] = React.useState(
    Math.max(...translationData.nodes.map((node) => parseInt(node.year)))
  )
  const [marks, setMarks] = React.useState<Mark[]>([])

  React.useEffect(() => {
    const tempMarks: Mark[] = []
    getTranslationData().nodes.forEach((node) => {
      const nodeYear = parseInt(node.year)
      if (tempMarks.find((mark) => mark.value === nodeYear)) return
      tempMarks.push({
        value: nodeYear,
        label: ``,
      })
    })
    setMarks([...tempMarks.sort((a, b) => a.value - b.value)])
  }, [])

  const onSliderChange = (value: number) => {
    setSliderValue(value)
  }

  const [filterName, setFilterName] = React.useState<string[]>([])

  return { sliderValue, marks, onSliderChange, filterName, setFilterName }
}
