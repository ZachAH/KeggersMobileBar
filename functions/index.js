const { onDocumentCreated } = require('firebase-functions/v2/firestore')
const { initializeApp } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const { getMessaging } = require('firebase-admin/messaging')

initializeApp()

// Fires whenever the public contact form writes a new inquiry, and pushes a
// notification to every device the admin has enabled notifications on.
exports.onInquiryCreated = onDocumentCreated('inquiries/{inquiryId}', async (event) => {
  const inquiry = event.data?.data()
  if (!inquiry) return

  const db = getFirestore()
  const tokensSnapshot = await db.collection('fcm_tokens').get()
  if (tokensSnapshot.empty) return

  const tokens = tokensSnapshot.docs.map((doc) => doc.id)

  const preview = (inquiry.message || '').slice(0, 120)

  const response = await getMessaging().sendEachForMulticast({
    tokens,
    notification: {
      title: `New inquiry from ${inquiry.name || 'someone'}`,
      body: preview || `${inquiry.email} would like to hear back from you.`,
    },
    webpush: {
      fcmOptions: { link: '/admin' },
    },
  })

  // Prune tokens that are no longer valid (browser data cleared,
  // notifications revoked, etc.) so the list doesn't grow stale forever.
  const staleTokens = []
  response.responses.forEach((result, index) => {
    if (
      !result.success &&
      (result.error?.code === 'messaging/registration-token-not-registered' ||
        result.error?.code === 'messaging/invalid-registration-token')
    ) {
      staleTokens.push(tokens[index])
    }
  })

  await Promise.all(staleTokens.map((token) => db.collection('fcm_tokens').doc(token).delete()))
})
