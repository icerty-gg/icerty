export const useDate = (isoDate: string) => {
  const date = new Date(isoDate)
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const

  return date.toLocaleDateString('us-US', options)
}
