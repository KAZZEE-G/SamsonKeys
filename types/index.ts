export type Category =
  | 'art'
  | 'motor'
  | 'property'
  | 'jewellery'
  | 'watch'
  | 'collectible'
  | 'memorabilia'
  | 'other'

export type BadgeType = 'rare' | 'sold' | 'new' | 'unique'

export interface Listing {
  id: string
  title: string
  description: string
  price: number
  currency: string
  category: Category
  badge: BadgeType
  pieces_total: number
  pieces_sold: number
  image_url: string
  seller_name: string
  medium?: string
  year?: number
  dimensions?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Ad {
  id: string
  label: string
  name: string
  subtitle: string
  position: 'banner' | 'sidebar'
  link_url: string
  is_active: boolean
  sort_order: number
  created_at: string
}

export interface Application {
  id: string
  first_name: string
  last_name: string
  email: string
  website?: string
  category: Category
  pieces_per_year: string
  pitch: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}
