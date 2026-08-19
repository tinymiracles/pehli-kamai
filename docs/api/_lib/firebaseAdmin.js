// Server-side Firestore access using a Firebase service account -- this
// runs on Vercel's server, never in the browser, so it can read/write
// grievances directly without going through the client-side Firestore
// rules at all (those still apply to the main site's own reads/writes;
// this is a separate, admin-level path).
//
// Needs three Vercel environment variables, all from a Firebase service
// account key (Firebase Console -> Project settings -> Service accounts
// -> Generate new private key, which downloads a JSON file):
//   FIREBASE_PROJECT_ID    -- the "project_id" field
//   FIREBASE_CLIENT_EMAIL  -- the "client_email" field
//   FIREBASE_PRIVATE_KEY   -- the "private_key" field, pasted as-is
//                             (Vercel's env var UI handles the embedded
//                             newlines fine when pasted directly)
const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Env var UIs sometimes flatten real newlines to the literal
      // two-character sequence \n -- undo that if present.
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    }),
  });
}

module.exports = admin.firestore();
