import { dataBase } from '@/lib/dexie'

export const exportDatabase = async (): Promise<Blob> => {
  const blob = await dataBase.export()
  return blob
}

export const importDatabase = async (file: File): Promise<void> => {
  await dataBase.import(file)
}

export const deleteDatabase = async (): Promise<void> => {
  await dataBase.delete({ disableAutoOpen: false })
}
