import { dataBase } from '@/lib/dexie'
import { type CharacterBookDatabaseData, type CharacterBookEditorState } from '@/types/lorebook'
import 'dexie-export-import'
import { nanoid } from 'nanoid'

export const createCharacterBook = async (characterBook: CharacterBookEditorState): Promise<CharacterBookDatabaseData> => {
  if (characterBook.name === undefined || characterBook.name === '') throw new Error('Character book name is required')
  const id = nanoid()
  await dataBase.characterBooks.add({
    ...characterBook,
    id
  })
  return await dataBase.characterBooks.where('id').equals(id).first() as CharacterBookDatabaseData
}

export const getAllCharacterBooks = async (): Promise<CharacterBookDatabaseData[]> => {
  return await dataBase.characterBooks.toArray()
}

export const updateCharacterBook = async (characterBook: CharacterBookDatabaseData): Promise<CharacterBookDatabaseData> => {
  await dataBase.characterBooks.put(characterBook)
  return await dataBase.characterBooks.where('id').equals(characterBook.id).first() as CharacterBookDatabaseData
}

export const deleteCharacterBook = async (id: string): Promise<void> => {
  await dataBase.characterBooks.where('id').equals(id).delete()
}

export const deleteAllCharacterBooks = async (): Promise<void> => {
  await dataBase.characterBooks.clear()
}

export const exportCharacterBookCollection = async (): Promise<Blob> => {
  const blob = await dataBase.export({
    filter (table) {
      return table === 'characterBooks'
    }
  })
  return blob
}

export const importCharacterBookCollection = async (file: File): Promise<void> => {
  await dataBase.import(file, {
    filter (table) {
      return table === 'characterBooks'
    }
  })
}
