import { type CharacterBookData } from './lorebook'

export interface CharacterData {
  name: string
  description: string
  personality: string
  mes_example: string
  scenario: string
  first_mes: string
  alternate_greetings: string[]
  creator: string
  creator_notes: string
  character_version: string
  tags: string[]
  system_prompt: string
  post_history_instructions: string
  character_book?: CharacterBookData
  extensions: Record<string, any>
}

export interface CharacterEditorState extends CharacterData {
  id?: string
  image?: string
}

export interface CharacterDatabaseData extends CharacterData {
  id: string
  image?: string
}
