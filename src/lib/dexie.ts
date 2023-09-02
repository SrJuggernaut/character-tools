import { type CharacterDatabaseData } from '@/types/character'
import Dexie, { type Table } from 'dexie'

export class CharacterToolsDatabase extends Dexie {
  characters!: Table<CharacterDatabaseData>
  constructor () {
    super('CharacterToolsDatabase')
    this.version(1).stores({
      characters: 'id, name, creator, tags, character_version'
    })
  }
}

export const dataBase = new CharacterToolsDatabase()
