export interface NewInquiry {
  name: string
  email: string
  phone: string
  message: string
}

export interface Inquiry extends NewInquiry {
  id: string
  created_at: string
}
