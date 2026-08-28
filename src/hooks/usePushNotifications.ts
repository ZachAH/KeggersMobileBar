import { deleteToken, getToken, onMessage } from 'firebase/messaging'
import { useEffect, useState } from 'react'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { getMessagingInstance } from '../lib/messaging'
import { useAuth } from './useAuth'

export type PushStatus = 'idle' | 'checking' | 'enabled' | 'denied' | 'unsupported' | 'error'

export function usePushNotifications() {
  const { user } = useAuth()
  const [status, setStatus] = useState<PushStatus>('checking')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function checkStatus() {
      const messaging = await getMessagingInstance()
      if (!messaging) {
        if (!cancelled) setStatus('unsupported')
        return
      }
      if (Notification.permission === 'denied') {
        if (!cancelled) setStatus('denied')
        return
      }
      if (!cancelled) setStatus('idle')
    }

    checkStatus()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let unsubscribe: (() => void) | undefined
    getMessagingInstance().then((messaging) => {
      if (!messaging) return
      // Foreground messages don't trigger the service worker's background
      // handler — show a lightweight in-app notification instead.
      unsubscribe = onMessage(messaging, (payload) => {
        const title = payload.notification?.title ?? 'New inquiry'
        if (Notification.permission === 'granted') {
          new Notification(title, { body: payload.notification?.body })
        }
      })
    })
    return () => unsubscribe?.()
  }, [])

  async function enable() {
    setError(null)
    setStatus('checking')
    try {
      const messaging = await getMessagingInstance()
      if (!messaging) {
        setStatus('unsupported')
        return
      }

      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        setStatus('denied')
        return
      }

      const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY
      if (!vapidKey) {
        setError('Push notifications are not configured yet (missing VAPID key).')
        setStatus('error')
        return
      }

      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
      const token = await getToken(messaging, { vapidKey, serviceWorkerRegistration: registration })

      if (!token || !user) {
        setStatus('error')
        return
      }

      await setDoc(doc(db, 'fcm_tokens', token), {
        uid: user.uid,
        created_at: serverTimestamp(),
      })

      setStatus('enabled')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to enable notifications.')
      setStatus('error')
    }
  }

  async function disable() {
    try {
      const messaging = await getMessagingInstance()
      if (messaging) await deleteToken(messaging)
    } catch {
      // Best-effort — the token will simply age out server-side if this fails.
    }
    setStatus('idle')
  }

  return { status, error, enable, disable }
}
