import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../lib/firebase'
import type { AppearanceLocation, NewAppearanceLocation } from '../types/location'

const COLLECTION = 'locations'

export function useLocations() {
  return useQuery({
    queryKey: [COLLECTION],
    networkMode: 'always',
    retry: 1,
    queryFn: async (): Promise<AppearanceLocation[]> => {
      const q = query(collection(db, COLLECTION), orderBy('event_date', 'asc'))
      const snapshot = await getDocs(q)
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as AppearanceLocation)
    },
  })
}

export function useCreateLocation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ imageFile, ...location }: NewAppearanceLocation) => {
      let image_url: string | null = null
      let image_path: string | null = null

      if (imageFile) {
        image_path = `locations/${Date.now()}-${imageFile.name}`
        const storageRef = ref(storage, image_path)
        await uploadBytes(storageRef, imageFile)
        image_url = await getDownloadURL(storageRef)
      }

      await addDoc(collection(db, COLLECTION), {
        ...location,
        image_url,
        image_path,
        created_at: new Date().toISOString(),
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [COLLECTION] }),
  })
}

export function useDeleteLocation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (location: Pick<AppearanceLocation, 'id' | 'image_path'>) => {
      if (location.image_path) {
        await deleteObject(ref(storage, location.image_path)).catch(() => {})
      }
      await deleteDoc(doc(db, COLLECTION, location.id))
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [COLLECTION] }),
  })
}
