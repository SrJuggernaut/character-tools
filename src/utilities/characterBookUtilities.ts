import { type CharacterBookEditorState } from '@/types/lorebook'
import { type CharacterBook } from 'character-card-utils'

export const characterBookToCharacterEditor = (characterBook: CharacterBook): CharacterBookEditorState => {
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
