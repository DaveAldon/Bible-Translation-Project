const convertToScale = (
  num: number,
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number
) => {
  return ((num - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin
}

export const getColorFromSpectrum = (spectrum: number) => {
  const newSpectrum = convertToScale(spectrum, 100, 300, 0, 100)
  var r,
    g,
    b = 0
  if (newSpectrum < 50) {
    r = 255
    g = Math.round(5.1 * newSpectrum)
  } else {
    g = 255
    r = Math.round(510 - 5.1 * newSpectrum)
  }
  var h = r * 0x10000 + g * 0x100 + b * 0x1
  return `#${('000000' + h.toString(16)).slice(-6)}`
}
