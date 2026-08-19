const { verify } = require('./_lib/auth');

module.exports = async function handler(req, res) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!verify(token)) { res.status(401).json({ error: 'Not signed in.' }); return; }

  // Required lazily, after the auth check, so a bad/missing password
  // never even needs Firestore credentials to be configured yet.
  const db = require('./_lib/firebaseAdmin');

  if (req.method === 'GET') {
    try {
      const snap = await db.collection('grievances').orderBy('createdAt', 'desc').get();
      res.status(200).json({ rows: snap.docs.map(d => ({ id: d.id, ...d.data() })) });
    } catch (e) {
      res.status(500).json({ error: 'Could not load grievances: ' + e.message });
    }
    return;
  }

  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
    const { id, status } = body || {};
    if (!id || !status) { res.status(400).json({ error: 'Missing id or status.' }); return; }
    try {
      await db.collection('grievances').doc(id).update({ status, statusUpdatedAt: new Date().toISOString() });
      res.status(200).json({ ok: true });
    } catch (e) {
      res.status(500).json({ error: 'Could not update status: ' + e.message });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
};
