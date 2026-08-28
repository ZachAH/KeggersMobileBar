# Keggers Mobile Bar

Local mocktail bar site: marketing pages, menu, and a "Where We'll Be" schedule with a simple
admin login so it can be updated without touching code.

## Stack

- Vite + React + TypeScript
- React Router
- Tailwind CSS
- Firebase (Auth + Firestore for the "Where We'll Be" schedule and menu, Storage for photos,
  Cloud Functions + Cloud Messaging for inquiry push notifications)
- TanStack Query

## Setup

1. `npm install`
2. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
3. Add a Web app to the project (Project settings → General → Your apps) and copy the config
   values into `.env` (copy `.env.example` to `.env` first).
4. Enable **Authentication → Sign-in method → Email/Password**, then add one user under
   **Authentication → Users** (the admin/mom login).
5. Enable **Firestore Database** and **Storage** in the console (just click "Get started" on each
   — no config needed there).
6. Publish the security rules with the Firebase CLI (already configured via `firebase.json` /
   `.firebaserc` in this repo):
   ```bash
   firebase login          # one-time, opens a browser to sign in
   firebase deploy --only firestore:rules,storage:rules
   ```
   Re-run the `deploy` command any time [`firebase/firestore.rules`](firebase/firestore.rules) or
   [`firebase/storage.rules`](firebase/storage.rules) changes — the rules only take effect once
   published.
7. `npm run dev`

The admin dashboard lives at `/admin` (redirects to `/admin/login` if not signed in) — manage
upcoming "Where We'll Be" stops, the menu, and contact-form inquiries there.

## Push notifications for new inquiries

Requires the **Blaze (pay-as-you-go)** plan — Cloud Functions don't run on the free Spark plan.
Realistically $0/month at this project's scale, but it does need a card on file
(Project settings → Usage and billing).

1. In the Firebase Console: **Project settings → Cloud Messaging** tab → under "Web
   configuration", click **Generate key pair**. Copy the resulting key.
2. Add it to `.env`: `VITE_FIREBASE_VAPID_KEY=<the key you copied>`.
3. Publish the updated Firestore rules (adds the `fcm_tokens` collection):
   ```bash
   firebase deploy --only firestore:rules
   ```
4. Install and deploy the Cloud Function:
   ```bash
   cd functions && npm install && cd ..
   firebase deploy --only functions
   ```
5. `npm run dev`, sign into `/admin`, and click **Enable** under "Push Notifications". On iPhone,
   Safari only supports push for sites added to the Home Screen — tap Share → Add to Home Screen
   first, then open it from there and enable notifications.

Once set up, every new contact-form submission triggers a push to every device that's enabled
notifications, deep-linking back to `/admin`.
