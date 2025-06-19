const db = require('../config/db')

const findUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const findUserByPhoneNumber = async (phone) =>{
   const result = await db.query('SELECT * FROM users WHERE phone = $1', [phone]);
  return result.rows[0];
}

const createUser = async (fullName, email,phone, hashedPassword, role, specialist) => {
  await db.query(
    'INSERT INTO users (fullName, email, phone, password, role, department, "created_Date") VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)',
    [fullName, email, phone, hashedPassword, role, specialist]
  );
};

module.exports = {
  findUserByEmail,
  createUser, findUserByPhoneNumber
};