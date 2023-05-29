import React from 'react'
import { getTranslationData } from '../util/getTranslationData'
import { Mark } from '../components/GraphTree/GraphTreeTypes'
import { BibleNode } from '../../../types/tree'

export const useHistory = () => {
  const translationData = getTranslationData()
  const [showTooltips, setShowTooltips] = React.useState<boolean>(true)
  const [sliderValue, setSliderValue] = React.useState(
    Math.max(
      ...translationData.nodes.map((node: BibleNode) =>
        parseInt(node.data.year)
      )
    )
  )
  const [marks, setMarks] = React.useState<Mark[]>([])
  const [filterName, setFilterName] = React.useState<string>('')
  const [fitViewToggle, setFitViewToggle] = React.useState<boolean>(true)

  React.useEffect(() => {
    const tempMarks: Mark[] = []
    getTranslationData().nodes.forEach((node: BibleNode) => {
      const nodeYear = parseInt(node.data.year)
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

  return {
    sliderValue,
    marks,
    onSliderChange,
    filterName,
    setFilterName,
    fitViewToggle,
    setFitViewToggle,
    showTooltips,
    setShowTooltips,
  }
}
