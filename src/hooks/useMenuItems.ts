import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../lib/firebase'
import type { MenuItem, NewMenuItem } from '../types/menuItem'

const COLLECTION = 'menu_items'

export function useMenuItems() {
  return useQuery({
    queryKey: [COLLECTION],
    networkMode: 'always',
    retry: 1,
    queryFn: async (): Promise<MenuItem[]> => {
      const q = query(collection(db, COLLECTION), orderBy('name', 'asc'))
      const snapshot = await getDocs(q)
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as MenuItem)
    },
  })
}

export function useCreateMenuItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ imageFile, ...item }: NewMenuItem) => {
      let image_url: string | null = null
      let image_path: string | null = null

      if (imageFile) {
        image_path = `menu/${Date.now()}-${imageFile.name}`
        const storageRef = ref(storage, image_path)
        await uploadBytes(storageRef, imageFile)
        image_url = await getDownloadURL(storageRef)
      }

      await addDoc(collection(db, COLLECTION), {
        ...item,
        image_url,
        image_path,
        created_at: new Date().toISOString(),
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [COLLECTION] }),
  })
}

export function useUpdateMenuItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      imageFile,
      existingImagePath,
      ...item
    }: NewMenuItem & { id: string; existingImagePath: string | null }) => {
      let image_url: string | undefined
      let image_path: string | undefined

      if (imageFile) {
        if (existingImagePath) {
          await deleteObject(ref(storage, existingImagePath)).catch(() => {})
        }
        image_path = `menu/${Date.now()}-${imageFile.name}`
        const storageRef = ref(storage, image_path)
        await uploadBytes(storageRef, imageFile)
        image_url = await getDownloadURL(storageRef)
      }

      await updateDoc(doc(db, COLLECTION, id), {
        ...item,
        ...(image_url !== undefined ? { image_url, image_path } : {}),
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [COLLECTION] }),
  })
}

export function useDeleteMenuItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (item: Pick<MenuItem, 'id' | 'image_path'>) => {
      if (item.image_path) {
        await deleteObject(ref(storage, item.image_path)).catch(() => {})
      }
      await deleteDoc(doc(db, COLLECTION, item.id))
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [COLLECTION] }),
  })
}

export function useToggleFavorite() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, favorite }: { id: string; favorite: boolean }) => {
      await updateDoc(doc(db, COLLECTION, id), { favorite })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [COLLECTION] }),
  })
}
