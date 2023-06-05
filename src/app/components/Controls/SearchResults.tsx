import { getTranslationData } from '@/app/util/getTranslationData'
import { getColorFromSpectrum } from '@/app/util/spectrums'
import { getYearText } from '@/app/util/years'
import { hext } from '@davealdon/hext'
import { Autocomplete, Box, Paper, TextField } from '@mui/material'

interface MenuItem {
  label: string
  visualLabel: string
  year: string
  spectrum: number
  id: string
}
interface SearchResultsProps {
  filterName: string
  setFilterName: (value: string) => void
}
export const SearchResults = (props: SearchResultsProps) => {
  const translations: MenuItem[] = getTranslationData().nodes.map((node) => {
    return {
      visualLabel: `${node.data.title}`,
      label: `${node.data.title} ${getYearText(parseInt(node.data.year))}`,
      year: `${getYearText(parseInt(node.data.year))}`,
      id: node.id,
      spectrum: parseInt(node.data.spectrum),
    }
  })
  return (
    <div>
      <Autocomplete
        data-tooltip-id="search-tooltip"
        data-tooltip-content="Search for a translation to navigate to it"
        disablePortal
        id="combo-box-demo"
        options={translations}
        sx={{ width: 300 }}
        onChange={(_event, value) => {
          props.setFilterName(value?.visualLabel ?? '')
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            InputLabelProps={{
              style: { color: 'white' },
            }}
            sx={{
              color: 'white',
              borderColor: 'white',
              input: { color: 'white' },
            }}
          />
        )}
        PaperComponent={({ children }) => (
          <Paper style={{ backgroundColor: '#111111', marginTop: 13 }}>
            {children}
          </Paper>
        )}
        renderOption={(props, option) => {
          return (
            <Box
              component="li"
              sx={{
                //backgroundColor: '#111111',
                '&:hover': {
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
              {...props}
            >
              <div
                className="flex flex-col w-full p-2 rounded-md"
                style={{
                  backgroundColor: hext(
                    getColorFromSpectrum(option.spectrum),
                    15
                  ),
                }}
              >
                <p className="text-white">{option.visualLabel}</p>
                <p className="text-white opacity-50">{option.year}</p>
                <div className="border-b border-white h-2 w-full opacity-25"></div>
              </div>
            </Box>
          )
        }}
      />
    </div>
  )
}
