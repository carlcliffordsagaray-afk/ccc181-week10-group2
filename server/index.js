require('dotenv').config();
const express = require('express');
const cors = require('cors');

const sessionsRouter = require('./routes/sessions');
const usersRouter = require('./routes/users');
const { notFound, errorHandler } = require('./middleware/errors');

const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is missing. Copy .env.example to .env (inside server/) and try again.');
  process.exit(1);
}

const app = express();


app.use(cors({ origin: CLIENT_ORIGIN })); 
app.use(express.json());


app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
app.use('/api/v1/sessions', sessionsRouter); 
app.use('/api/v1/users', usersRouter); 


app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Close the old backend terminal, or change PORT in server/.env.`);
  } else {
    console.error('Server error:', err.message);
  }
  process.exit(1);
});
