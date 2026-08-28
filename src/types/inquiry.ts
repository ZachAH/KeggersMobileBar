export interface NewInquiry {
  name: string
  email: string
  phone: string
  event_type: string
  event_date: string
  message: string
}

export interface Inquiry extends NewInquiry {
  id: string
  created_at: string
}
