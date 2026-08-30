export type MenuCategory = 'mocktail' | 'wellness-tea'

export interface MenuItem {
  id: string
  name: string
  description: string
  category: MenuCategory
  color: string
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
