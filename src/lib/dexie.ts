import { type CharacterDatabaseData } from '@/types/character'
import { type CharacterBookDatabaseData } from '@/types/lorebook'
import Dexie, { type Table } from 'dexie'

export class CharacterToolsDatabase extends Dexie {
  characters!: Table<CharacterDatabaseData>
  characterBooks!: Table<CharacterBookDatabaseData>
  constructor () {
    super('CharacterToolsDatabase')
    this.version(1).stores({
      characters: 'id, name, creator, tags, character_version',
      characterBooks: 'id, name'
    })
  }
}

export const dataBase = new CharacterToolsDatabase()
