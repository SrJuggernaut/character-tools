import { ZodError } from 'zod'

export const zodErrorToString = (error: ZodError): string => {
  return error.issues
    .map((issue) => {
      return `${issue.path.join('.')}: ${issue.message}`
    })
    .join('; ')
}
