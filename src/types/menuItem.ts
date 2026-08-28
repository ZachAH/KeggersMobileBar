export interface MenuItem {
  id: string
  name: string
  ingredients: string[]
  color: string
  favorite: boolean
  image_url: string | null
  image_path: string | null
  created_at: string
}

export type NewMenuItem = Omit<
  MenuItem,
  'id' | 'created_at' | 'image_url' | 'image_path'
> & {
  imageFile?: File | null
}
