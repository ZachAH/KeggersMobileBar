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
5. Enable **Firestore Database**, then publish the rules in
   [`firebase/firestore.rules`](firebase/firestore.rules) (paste into the Rules tab, or deploy
   with the Firebase CLI: `firebase deploy --only firestore:rules`).
6. Enable **Storage**, then publish the rules in [`firebase/storage.rules`](firebase/storage.rules)
   the same way (used for the optional photo on each "Where We'll Be" stop).
7. `npm run dev`

The admin dashboard for managing upcoming stops lives at `/admin` (redirects to `/admin/login`
if not signed in).
