const db = require('../config/db');

const addPatientRecord = async (patientId, patientName,gender, age, address, phone, doctorId,doctorName, symptoms, reason) => {
  await db.query(
    'INSERT INTO PatientRecord (patientId, patientName,gender, age, address, phone, doctor_id,doctor_name, symptoms, department,"created_Date") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP)',
    [patientId, patientName,gender, age, address, phone, doctorId,doctorName, symptoms, reason]
  );
};

module.exports = {
  addPatientRecord
};