import { type CharacterBookEditorState } from '@/types/lorebook'
import { replaceDateInTemplate } from '@/utilities/date'
import { CharacterCard, CharacterSpec } from '@lenml/char-card-reader'

export const extractCharacterBookFromCharacter = (
  character: CharacterCard
): CharacterSpec.CharacterBook => {
  return character.character_book
}

export const characterBookToCharacterEditor = (
  characterBook: CharacterSpec.CharacterBook
): CharacterBookEditorState => {
    const entries: CharacterBookEditorState['entries'] =
    characterBook.entries.map((entry) => ({
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

export const characterEditorToCharacterBook = (
  characterEditor: CharacterBookEditorState
): CharacterSpec.CharacterBook => {

  const entries: CharacterSpec.Entry[] = characterEditor.entries.map((ent) => {
    const ext = ent.extensions
    const extensions = {
      position: ext.position as number,
      exclude_recursion: ext.exclude_recursion as boolean,
      display_index: ext.display_index as number,
      probability: ext.probability as number,
      useProbability: ext.useProbability as boolean,
      depth: ext.depth as number,
      selectiveLogic: ext.selectiveLogic as number,
      group: ext.group  as string,
      group_override: ext.group_override as boolean,
      group_weight: ext.group_weight  as number,
      prevent_recursion: ext.prevent_recursion  as boolean,
      delay_until_recursion: ext.delay_until_recursion  as boolean,
      scan_depth: ext.scan_depth,
      match_whole_words: ext.match_whole_words,
      use_group_scoring: ext.use_group_scoring as boolean,
      case_sensitive: ext.case_sensitive,
      automation_id: ext.automation_id as string,
      role: ext.role as number,
      vectorized: ext.vectorized as boolean,
      sticky: ext.sticky as number,
      cooldown: ext.cooldown  as number,
      delay: ext.delay  as number,
      match_persona_description: ext.match_persona_description as boolean,
      match_character_description: ext.match_character_description as boolean,
      match_character_personality: ext.match_character_personality as boolean,
      match_character_depth_prompt: ext.match_character_depth_prompt as boolean,
      match_scenario: ext.match_scenario as boolean,
      match_creator_notes: ext.match_creator_notes  as boolean
    }
    return {
      id: ent.id ?? 0,
      keys: ent.keys,
      secondary_keys: ent.secondary_keys,
      comment: ent.comment ?? '',
      content: ent.content,
      constant: ent.constant ?? false,
      selective: ent.selective ?? false,
      insertion_order: ent.insertion_order,
      enabled: ent.enabled,
      position: ent.position,
      use_regex: false,
      extensions
    }
  })
  return {
    entries,
    name: characterEditor.name,
    extensions: characterEditor.extensions
  }
}

export const JSONFileToCharacterBookEditor = async (
  file: File
): Promise<CharacterBookEditorState> => {
  const text = await file.text()
  const characterBook = JSON.parse(text)
  return characterBookToCharacterEditor(characterBook)
}

export const characterBookToJSONUrl = (
  characterBook: CharacterSpec.CharacterBook
): string => {
  const json = JSON.stringify(characterBook)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  return url
}

export interface CharacterBookData {
  name: string
  id?: string
}

export const getCharacterBookExportName = (
  template: string,
  characterBookData: CharacterBookData
): string => {
  template = template.replace('{{name}}', characterBookData.name)
  template = template.replace('{{id}}', characterBookData.id ?? '')
  return replaceDateInTemplate(template)
}
