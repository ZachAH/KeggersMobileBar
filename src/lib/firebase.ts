import { getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const hasConfig = !!(import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID)

if (!hasConfig) {
  // Only the "Where We'll Be" and admin pages need Firebase — don't crash the
  // whole app (e.g. the static marketing pages) just because it's unconfigured yet.
  console.warn(
    'Missing Firebase env vars. Copy .env.example to .env and fill in your Firebase project config.',
  )
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'placeholder-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'placeholder.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'placeholder',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:0:web:0',
}

const app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
