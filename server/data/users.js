const bcrypt = require('bcryptjs');

const users = [
  {
    id: 1,
    name: 'Demo Student',
    email: 'student@campusconnect.test',
    passwordHash: bcrypt.hashSync('Campus26', 10), 
  },
];


const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', 10);

function findByEmail(email) {
  return users.find((user) => user.email === email);
}

function findById(id) {
  return users.find((user) => user.id === id);
}


function toPublicUser(user) {
  return { id: user.id, name: user.name, email: user.email };
}

module.exports = { findByEmail, findById, toPublicUser, DUMMY_HASH };
