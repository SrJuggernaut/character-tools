import { format } from 'date-fns'

export const replaceDateInTemplate = (template: string): string => {
  const dateRegex = /{{date\s*(?<currentFormat>[^}]*)}}/g
  const dateMatches = [...template.matchAll(dateRegex)].filter(
    (match) => match.groups !== undefined
  )
  dateMatches.forEach((match) => {
    const completeMatch = match[0]
    const currentFormat =
      match.groups?.currentFormat !== undefined &&
      match.groups?.currentFormat !== ''
        ? match.groups?.currentFormat
        : 'yyyy-MM-dd-HH-mm'
    const date = new Date()
    const formattedDate = format(date, currentFormat)
    template = template.replace(completeMatch, formattedDate)
  })
  return template
}
