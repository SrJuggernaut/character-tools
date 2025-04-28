import { setAlert } from '@/state/feedbackSlice'
import store from '@/state/store'
import { type CharacterDatabaseData } from '@/types/character'
import { type CharacterBookDatabaseData } from '@/types/lorebook'
import { characterBookToCharacterEditor } from '@/utilities/characterBookUtilities'
import Dexie, { type Table } from 'dexie'
import { nanoid } from 'nanoid'

export class CharacterToolsDatabase extends Dexie {
  characters!: Table<CharacterDatabaseData>
  characterBooks!: Table<CharacterBookDatabaseData>
  constructor() {
    super('CharacterToolsDatabase')
    this.version(1).stores({
      characters: 'id, name, creator, tags, character_version'
    })
    this.version(2)
      .stores({
        characters: 'id, name, creator, tags, character_version',
        characterBooks: 'id, name'
      })
      .upgrade(async (transaction) => {
        const dispatch = store.dispatch
        dispatch(
          setAlert({
            title: 'Database Upgrade',
            severity: 'warning',
            message:
              'The database is being updated to version 2, this update includes support for characterBooks, if any previous character has a characterBook it will be added to the database.'
          })
        )
        return await transaction
          .table('characters')
          .toCollection()
          // biome-ignore lint/suspicious/noExplicitAny: Previous version type is no longer in the codebase, but migration requires it
          .modify(async (character: any) => {
            // 1. Get the character book from the character
            const characterBook = character.character_book
            // 2. If the character doesn't have a character book, do nothing
            if (characterBook === undefined) return
            if (!Array.isArray(characterBook.entries)) {
              //  Check if the characterBook.entries is an object, if it is, convert it to an array
              characterBook.entries = Object.entries(characterBook.entries).map(
                ([_, value]) => value
              )
            }
            // 3. Convert the character book to an editor state
            const characterBookEditorState =
              characterBookToCharacterEditor(characterBook)
            // 4. Generate an ID for the character book
            const characterBookId = nanoid()
            // 5. If the character book doesn't have a name, give it a default name
            if (
              characterBookEditorState.name === undefined ||
              characterBookEditorState.name === ''
            )
              characterBookEditorState.name = `Character Book for ${character.name as string}`
            // 6. Convert the editor state to a database-friendly format
            const characterBookDatabaseData: CharacterBookDatabaseData = {
              ...characterBookEditorState,
              id: characterBookId
            }
            // 7. Add the new character book to the database
            await transaction
              .table('characterBooks')
              .add(characterBookDatabaseData)
            // 8. Assign the character book to the character
            character.character_book = characterBookId
          })
          .finally(() => {
            dispatch(
              setAlert({
                title: 'Database Upgrade Complete',
                severity: 'success',
                message:
                  'The database has been successfully updated to version 2.'
              })
            )
          })
      })
  }
}

export const dataBase = new CharacterToolsDatabase()
