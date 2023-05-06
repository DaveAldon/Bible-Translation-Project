import { Dropdown } from '@nextui-org/react'

interface OrderByValue {
  label: string
  component: JSX.Element
}

interface DropDownProps {
  filterName: string
  setFilterName: (value: string) => void
  values: OrderByValue[]
}

export const DropDown = (props: DropDownProps) => {
  return (
    <div>
      <Dropdown>
        <Dropdown.Button
          className="bg-gray-900 text-white"
          css={{
            opacity: 1,
            backgroundColor: 'rgb(17 24 39)',
            color: 'rgb(255 255 255)',
          }}
          flat
        >
          Order By {props.filterName}
        </Dropdown.Button>
        <Dropdown.Menu
          css={{
            opacity: 1,
            backgroundColor: 'rgb(17 24 39)',
            color: 'white',
          }}
          aria-label="Dynamic Actions"
          onAction={(e) => {
            props.setFilterName(e.toString())
          }}
          defaultValue={props.filterName}
        >
          {props.values.map((item) => (
            <Dropdown.Item
              className="hover:bg-gray-500"
              css={{
                opacity: 1,
                backgroundColor: 'rgb(17 24 39)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgb(107 114 128)',
                },
              }}
              key={item.label}
              color={'default'}
            >
              {item.component}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}
