export const getYearText = (value: number) => {
  if (value < 0) {
    return `${Math.abs(value)} BC`
  }
  return `${value} AD`
}
