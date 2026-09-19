const { onDocumentCreated } = require('firebase-functions/v2/firestore')
const { defineSecret } = require('firebase-functions/params')
const { initializeApp } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const { getMessaging } = require('firebase-admin/messaging')
const nodemailer = require('nodemailer')

initializeApp()

const gmailAppPassword = defineSecret('GMAIL_APP_PASSWORD')

// The Gmail/Workspace account inquiry alerts are sent from and to.
const NOTIFY_EMAIL = 'sandy@keggersmobilebar.com'

// Fires whenever the public contact form writes a new inquiry: pushes a
// notification to every device the admin has enabled notifications on, and
// emails the owner the inquiry details.
exports.onInquiryCreated = onDocumentCreated(
  { document: 'inquiries/{inquiryId}', secrets: [gmailAppPassword] },
  async (event) => {
    const inquiry = event.data?.data()
    if (!inquiry) return

    const db = getFirestore()
    const tokensSnapshot = await db.collection('fcm_tokens').get()

    const preview = (inquiry.message || '').slice(0, 120)

    if (!tokensSnapshot.empty) {
      const tokens = tokensSnapshot.docs.map((doc) => doc.id)

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
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: NOTIFY_EMAIL,
        pass: gmailAppPassword.value(),
      },
    })

    await transporter.sendMail({
      from: `Keggers Mobile Bar Website <${NOTIFY_EMAIL}>`,
      to: NOTIFY_EMAIL,
      replyTo: inquiry.email,
      subject: `New inquiry from ${inquiry.name || 'a website visitor'}`,
      text: [
        `Name: ${inquiry.name || 'N/A'}`,
        `Email: ${inquiry.email || 'N/A'}`,
        `Phone: ${inquiry.phone || 'N/A'}`,
        '',
        'Message:',
        inquiry.message || '(no message)',
      ].join('\n'),
    })
  }
)
