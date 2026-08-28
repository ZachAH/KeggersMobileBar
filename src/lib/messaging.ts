import { getApps } from 'firebase/app'
import { getMessaging, isSupported, type Messaging } from 'firebase/messaging'

let messagingPromise: Promise<Messaging | null> | null = null

// Lazily initialized, and guarded with `isSupported()` — the Push API isn't
// available in every browser (notably iOS Safari outside of an installed
// PWA), so this must never be imported eagerly from firebase.ts, or it'd
// break every page for unsupported browsers.
export function getMessagingInstance(): Promise<Messaging | null> {
  if (!messagingPromise) {
    messagingPromise = isSupported().then((supported) => {
      if (!supported || !getApps().length) return null
      return getMessaging(getApps()[0])
    })
  }
  return messagingPromise
}
