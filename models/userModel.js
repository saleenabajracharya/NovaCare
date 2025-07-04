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

const getUsers = async () =>{
  const result = await db.query(`select * from "users" where "deleted_Date" IS NULL`);
  return result.rows;
}

const getSingleUsers = async (UserId) =>{
  const result = await db.query(`select * from "users" where "UserId" = $1 AND "deleted_Date" IS NULL`,[UserId]);
  return result.rows[0];
}

const updateUser = async (
  UserId,
  fullname,
  phone,
  email,
  role,
  department,
  modifiedBy
) => {
  await db.query(
    `UPDATE users
     SET
       fullname = $1,
       phone = $2,
       email = $3,
       role = $4,
       department = $5,
       "modified_User" = $6,
       "modified_Date" = CURRENT_DATE
     WHERE "UserId" = $7 AND "deleted_Date" IS NULL
`,
    [
      fullname,
      phone,
      email,
      role,
      department,
      modifiedBy,
      UserId,
    ]
  );
};

const removeUser = async (
  UserId
) => {
  await db.query(
    `UPDATE users
     SET
       "deleted_Date" = CURRENT_DATE
     WHERE "UserId" = $1 AND "deleted_Date" IS NULL
`,
    [
      UserId
    ]
  );
};

const removeUsers = async (
) => {
  await db.query(
    `UPDATE users
     SET
       "deleted_Date" = CURRENT_DATE
     WHERE "deleted_Date" IS NULL
`,
  );
};


module.exports = {
  findUserByEmail,getUsers, getSingleUsers, updateUser,
  createUser, findUserByPhoneNumber, removeUser, removeUsers
};