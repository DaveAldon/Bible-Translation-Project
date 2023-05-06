import React from 'react'
import { getTranslationData } from '../util/getTranslationData'
import { BibleNode } from '../../../types/tree'
import { BarsArrowDownIcon, BarsArrowUpIcon } from '@heroicons/react/20/solid'

interface OrderByValue {
  label: string
  component: JSX.Element
}

export const useTranslations = () => {
  const [versionSearch, setVersionSearch] = React.useState('')
  const [translationData, _setTranslationData] = React.useState<BibleNode[]>(
    getTranslationData().nodes
  )
  const [translations, setTranslations] = React.useState<BibleNode[]>([])
  const [orderBy, setOrderBy] = React.useState<OrderByValue>()
  const orderByValues: OrderByValue[] = [
    {
      label: 'Name (Asc)',
      component: (
        <div className="flex flex-row">
          <BarsArrowUpIcon className="h-6 w-6 mr-2" />
          <p>Name (Asc)</p>
        </div>
      ),
    },
    {
      label: 'Name (Desc)',
      component: (
        <div className="flex flex-row">
          <BarsArrowDownIcon className="h-6 w-6 mr-2" />
          <p>Name (Desc)</p>
        </div>
      ),
    },
    {
      label: 'Year Published (Asc)',
      component: (
        <div className="flex flex-row">
          <BarsArrowUpIcon className="h-6 w-6 mr-2" />
          <p>Year Published (Asc)</p>
        </div>
      ),
    },
    {
      label: 'Year Published (Desc)',
      component: (
        <div className="flex flex-row">
          <BarsArrowDownIcon className="h-6 w-6 mr-2" />
          <p>Year Published (Desc)</p>
        </div>
      ),
    },
  ]

  const updateOrderBy = (value: string) => {
    const orderByValue = orderByValues.find((orderByValue) => {
      return orderByValue.label === value
    })
    setOrderBy(orderByValue)
  }

  React.useEffect(() => {
    const filteredTranslations = translationData
      .filter((translation) => {
        return (
          translation.data.title
            .toLowerCase()
            .includes(versionSearch.toLowerCase()) ||
          translation.data.acronym
            .toLowerCase()
            .includes(versionSearch.toLowerCase())
        )
      })
      .sort((a, b) => {
        if (orderBy?.label === 'Name (Asc)') {
          if (a.data.title < b.data.title) {
            return -1
          }
          return 1
        } else if (orderBy?.label === 'Name (Desc)') {
          if (a.data.title > b.data.title) {
            return -1
          }
          return 1
        } else if (orderBy?.label === 'Year Published (Asc)') {
          return parseInt(a.data.year) - parseInt(b.data.year)
        } else if (orderBy?.label === 'Year Published (Desc)') {
          return parseInt(b.data.year) - parseInt(a.data.year)
        }
        return 0
      })

    setTranslations([...filteredTranslations])
  }, [versionSearch, orderBy?.label])

  return {
    translations,
    setVersionSearch,
    orderBy,
    updateOrderBy,
    orderByValues,
  }
}
