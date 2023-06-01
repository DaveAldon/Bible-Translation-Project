export const getColorFromSpectrum = (spectrum: number) => {
  var alpha = 1
  var max = 300
  const value = intToRGB(spectrum, alpha, max)
  return value === '#NaNNaNNaN' ? '#000000' : value
}

const componentToHex = (c: number) => {
  var hex = c.toString(16)
  return hex.length == 1 ? '0' + hex : hex
}

const intToRGB = (value: number, _alpha: number, max: number) => {
  var valueAsPercentageOfMax = value / max
  // actual max is 16777215 but represnts white so we will take a max that is
  // below this to avoid white
  var MAX_RGB_INT = 16600000
  var valueFromMaxRgbInt = Math.floor(MAX_RGB_INT * valueAsPercentageOfMax)
  var blue = Math.floor(valueFromMaxRgbInt % 256)
  var green = Math.floor((valueFromMaxRgbInt / 256) % 256)
  var red = Math.floor((valueFromMaxRgbInt / 256 / 256) % 256)
  return `#${
    componentToHex(red) + componentToHex(green) + componentToHex(blue)
  }`
}
