const { sign } = require('./_lib/auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const expected = process.env.ADMIN_DASHBOARD_PASSWORD;
  if (!expected) {
    res.status(500).json({ error: 'Server missing ADMIN_DASHBOARD_PASSWORD -- set it in Vercel env vars.' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const password = (body && body.password) || '';

  if (password !== expected) {
    res.status(401).json({ error: 'Wrong password.' });
    return;
  }

  const exp = Date.now() + 12 * 60 * 60 * 1000; // 12-hour session
  res.status(200).json({ token: sign({ exp }), exp });
};
