// Shared by admin-login.js and grievances.js. Underscore-prefixed folder
// so Vercel doesn't turn this into its own route -- it's a library, not
// an endpoint.
//
// Sessions are a signed, stateless token rather than anything stored on
// the server (there's nowhere to store it between serverless calls
// anyway): {exp: <timestamp>} base64url-encoded, HMAC-signed with the
// same shared password staff type in to log in. Anyone without that
// password can't forge a valid signature; anyone with it could always
// get in the front door regardless, so reusing it as the HMAC key adds
// no real weakness and saves a second secret to configure in Vercel.
const crypto = require('crypto');

function b64urlEncode(str) {
  return Buffer.from(str, 'utf8').toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function b64urlDecode(str) {
  return Buffer.from(str.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');
}

function sign(payload) {
  const secret = process.env.ADMIN_DASHBOARD_PASSWORD || '';
  const body = b64urlEncode(JSON.stringify(payload));
  const sig = crypto.createHmac('sha256', secret).update(body).digest('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return `${body}.${sig}`;
}

function verify(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const secret = process.env.ADMIN_DASHBOARD_PASSWORD || '';
  const [body, sig] = token.split('.');
  const expected = crypto.createHmac('sha256', secret).update(body).digest('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  // Constant-time compare so a mismatched signature can't be timed byte-by-byte.
  const a = Buffer.from(sig || '');
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  let payload;
  try { payload = JSON.parse(b64urlDecode(body)); } catch { return null; }
  if (!payload || typeof payload.exp !== 'number' || Date.now() > payload.exp) return null;
  return payload;
}

module.exports = { sign, verify };
