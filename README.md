# Keggers Mobile Bar

Local mocktail bar site: marketing pages, menu, and a "Where We'll Be" schedule with a simple
admin login so it can be updated without touching code.

## Stack

- Vite + React + TypeScript
- React Router
- Tailwind CSS
- Firebase (Auth + Firestore for the "Where We'll Be" schedule, Storage for stop photos)
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
upcoming "Where We'll Be" stops and view contact-form inquiries there.
