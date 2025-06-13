const db = require('../config/db')

const findUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const createUser = async (fullName, email, hashedPassword, role, specialist) => {
  await db.query(
    'INSERT INTO users (fullName, email, password, role, specialist, "createdDate") VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)',
    [fullName, email, hashedPassword, role, specialist]
  );
};

module.exports = {
  findUserByEmail,
  createUser
};