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
import { db } from '../lib/firebase'
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
    mutationFn: async (location: NewAppearanceLocation) => {
      await addDoc(collection(db, COLLECTION), {
        ...location,
        created_at: new Date().toISOString(),
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [COLLECTION] }),
  })
}

export function useDeleteLocation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteDoc(doc(db, COLLECTION, id))
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [COLLECTION] }),
  })
}
