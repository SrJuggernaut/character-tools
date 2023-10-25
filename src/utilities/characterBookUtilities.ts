import { type CharacterBookEditorState } from '@/types/lorebook'
import { type CharacterBook } from 'character-card-utils'
import { z } from 'zod'

const characterBookEntrySchema = z.object({
  keys: z.array(z.string()),
  content: z.string(),
  extensions: z.record(z.any()),
  enabled: z.boolean(),
  insertion_order: z.number(),
  case_sensitive: z.boolean().optional(),
  name: z.string().optional(),
  priority: z.number().optional(),
  id: z.number().optional(),
  comment: z.string().optional(),
  selective: z.boolean().optional(),
  secondary_keys: z.array(z.string()).optional(),
  constant: z.boolean().optional(),
  position: z.union([z.literal('before_char'), z.literal('after_char')]).optional()

})

const characterBookSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  scan_depth: z.number().optional(),
  token_budget: z.number().optional(),
  recursive_scanning: z.boolean().optional(),
  extensions: z.record(z.any()).optional(),
  entries: z.array(characterBookEntrySchema)
})

export const characterBookToCharacterEditor = (characterBook: CharacterBook): CharacterBookEditorState => {
  const result = characterBookSchema.safeParse(characterBook)
  if (!result.success) throw new Error(`Invalid CharacterBook: ${result.error.errors.map(error => { return `${error.path.join('.')}: ${error.message}` }).join('; ')}`)
  const entries: CharacterBookEditorState['entries'] = characterBook.entries.map((entry) => ({
    ...entry,
    position: entry.position ?? 'before_char',
    enabled: entry.enabled ?? true,
    keys: entry.keys ?? [],
    secondary_keys: entry.secondary_keys ?? [],
    content: entry.content ?? '',
    insertion_order: entry.insertion_order ?? 1,
    extensions: entry.extensions ?? {}
  }))
  return {
    ...characterBook,
    name: characterBook.name ?? '',
    entries
  }
}

export const characterEditorToCharacterBook = (characterEditor: CharacterBookEditorState): CharacterBook => {
  const { id, ...rest } = characterEditor
  return rest
}

export const JSONFileToCharacterBookEditor = async (file: File): Promise<CharacterBookEditorState> => {
  const text = await file.text()
  const characterBook = JSON.parse(text)
  return characterBookToCharacterEditor(characterBook)
}

export const characterBookToJSONUrl = (characterBook: CharacterBook): string => {
  const json = JSON.stringify(characterBook)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  return url
}
