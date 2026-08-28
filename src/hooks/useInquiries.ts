import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { Inquiry, NewInquiry } from '../types/inquiry'

const COLLECTION = 'inquiries'

export function useCreateInquiry() {
  return useMutation({
    mutationFn: async (inquiry: NewInquiry) => {
      await addDoc(collection(db, COLLECTION), {
        ...inquiry,
        created_at: new Date().toISOString(),
      })
    },
  })
}

export function useInquiries() {
  return useQuery({
    queryKey: [COLLECTION],
    networkMode: 'always',
    retry: 1,
    queryFn: async (): Promise<Inquiry[]> => {
      const q = query(collection(db, COLLECTION), orderBy('created_at', 'desc'))
      const snapshot = await getDocs(q)
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Inquiry)
    },
  })
}

export function useDeleteInquiry() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteDoc(doc(db, COLLECTION, id))
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [COLLECTION] }),
  })
}
