const db = require('../config/db')

const findDoctorByDepartment = async (department) => {
  const result = await db.query(
    'SELECT fullname FROM users WHERE role = $1 AND department = $2 AND "deleted_Date" IS NULL',
    ['doctor', department]
  );
  return result.rows;
};

const findDoctorIdByDoctorName = async (fullName) =>{
    const result = await db.query(
    'SELECT "UserId" FROM users WHERE role = $1 AND fullname = $2 AND "deleted_Date" IS NULL',
    ['doctor', fullName]
  );
  return result.rows[0];
}
module.exports = {
  findDoctorByDepartment, findDoctorIdByDoctorName
};