
const jwt = require('jsonwebtoken');
const { findById } = require('../data/users');

function requireAuth(req, res, next) {
  const header = req.get('Authorization') || '';
  const match = /^Bearer (\S+)$/.exec(header);

  if (!match) {
    return res.status(401).json({ error: 'Not logged in.' });
  }

  try {
    
    const payload = jwt.verify(match[1], process.env.JWT_SECRET, { algorithms: ['HS256'] });
    const user = findById(payload.sub);
    if (!user) {
      return res.status(401).json({ error: 'Not logged in.' });
    }
    req.user = user;
    return next();
  } catch {
    
    return res.status(401).json({ error: 'Not logged in.' });
  }
}

module.exports = requireAuth;
