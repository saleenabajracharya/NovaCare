const db = require('../config/db');

const addPatientRecord = async (patientId, patientName,gender, age, address, phone, doctorId,doctorName, symptoms, reason, date, email) => {
  await db.query(
    'INSERT INTO PatientRecord (patientId, patientName,gender, age, address, phone, doctor_id,doctor_name, symptoms, department, date, email, "created_Date") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, CURRENT_TIMESTAMP)',
    [patientId, patientName,gender, age, address, phone, doctorId,doctorName, symptoms, reason, date, email]
  );
};

const updatePatientRecord = async (
  formId,
  patientId,
  patientName,
  gender,
  age,
  address,
  phone,
  doctorId,
  doctorName,
  symptoms,
  reason,
  date,
  email,
  description
) => {
  await db.query(
    `UPDATE PatientRecord
     SET 
       patientId = $1,
       patientName = $2,
       gender = $3,
       age = $4,
       address = $5,
       phone = $6,
       doctor_id = $7,
       doctor_name = $8,
       symptoms = $9,
       department = $10,
       date = $11,
       email = $12,
       description = $13,
       "modified_Date" = CURRENT_TIMESTAMP
     WHERE "FormId" = $14 AND "deleted_Date" IS NULL`,
    [
      patientId,
      patientName,
      gender,
      age,
      address,
      phone,
      doctorId,
      doctorName,
      symptoms,
      reason,
      date,
      email,
      description,
      formId
    ]
  );
};



const getPatientRecord = async () =>{
  const result = await db.query('SELECT * FROM PatientRecord WHERE "deleted_Date" IS NULL order by "created_Date" DESC');
  return result.rows;
}

const todaysPatientRecord = async (reason) =>{
  const result = await db.query('SELECT * FROM PatientRecord WHERE "deleted_Date" IS NULL AND "department" = $1 AND "date" = CURRENT_DATE order by "date" ASC', [reason]);
  return result.rows;
}

const getSinglePatientRecord = async (FormId) =>{
  const result = await db.query('SELECT * FROM PatientRecord WHERE "deleted_Date" IS NULL AND "FormId" = $1',[FormId]);
  return result.rows[0];
}
module.exports = {
  addPatientRecord, getPatientRecord, todaysPatientRecord, getSinglePatientRecord, updatePatientRecord
};