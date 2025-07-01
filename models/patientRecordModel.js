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
       "modified_Date" = CURRENT_DATE
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

const insertMedicine = async (formId, meds) => {
  await db.query(`DELETE FROM "MedicineRecord" WHERE record_id = $1`, [formId]);

  for (const med of meds) {
    const values = [
      med.medicineName,
      med.medicineType,
      med.price === "" ? null : Number(med.price),
      med.quantity === "" ? null : Number(med.quantity),
      med.totalPrice === "" ? null : Number(med.totalPrice),
      formId,
    ];

    await db.query(
      `INSERT INTO "MedicineRecord"
       (medicine_name, medicine_type, price, quantity, total_price, record_id, "created_Date")
       VALUES ($1, $2, $3, $4, $5, $6, CURRENT_DATE)`,
      values
    );
  }
};



const getPatientRecord = async () => {
  const result = await db.query(`
    SELECT 
      pr.*, 
      COALESCE(
        json_agg(
          json_build_object(
            'id', mr.id,
            'medicineName', mr.medicine_name,
            'medicineType', mr.medicine_type,
            'price', mr.price,
            'quantity', mr.quantity,
            'totalPrice', mr.total_price
          )
        ) FILTER (WHERE mr."deleted_Date" IS NULL),
        '[]'
      ) AS prescribedMeds
    FROM "patientrecord" pr
    LEFT JOIN "MedicineRecord" mr ON pr."FormId" = mr.record_id
    WHERE pr."deleted_Date" IS NULL
    GROUP BY pr."FormId"
    ORDER BY pr."created_Date" DESC;
  `);

  return result.rows;
};


const todaysPatientRecord = async (reason) =>{
  const result = await db.query(`SELECT 
      pr.*, 
      COALESCE(
        json_agg(
          json_build_object(
            'id', mr.id,
            'medicineName', mr.medicine_name,
            'medicineType', mr.medicine_type,
            'price', mr.price,
            'quantity', mr.quantity,
            'totalPrice', mr.total_price
          )
        ) FILTER (WHERE mr."deleted_Date" IS NULL),
        '[]'
      ) AS prescribedMeds
    FROM "patientrecord" pr
    LEFT JOIN "MedicineRecord" mr ON pr."FormId" = mr.record_id
    WHERE pr."deleted_Date" IS NULL AND
    pr."department" = $1 AND DATE(pr."created_Date" AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kathmandu') = CURRENT_DATE GROUP BY pr."FormId"  order by "created_Date" ASC`, [reason]);
  return result.rows;
}

const getSinglePatientRecord = async (FormId) =>{
  const result = await db.query(`SELECT 
      pr.*, 
      COALESCE(
        json_agg(
          json_build_object(
            'id', mr.id,
            'medicineName', mr.medicine_name,
            'medicineType', mr.medicine_type,
            'price', mr.price,
            'quantity', mr.quantity,
            'totalPrice', mr.total_price
          )
        ) FILTER (WHERE mr."deleted_Date" IS NULL),
        '[]'
      ) AS prescribedMeds
    FROM "patientrecord" pr
    LEFT JOIN "MedicineRecord" mr ON pr."FormId" = mr.record_id
    WHERE pr."deleted_Date" IS NULL AND "FormId" = $1
    GROUP BY pr."FormId"`,[FormId]);
  return result.rows[0];
}
module.exports = {
  addPatientRecord, getPatientRecord, todaysPatientRecord, getSinglePatientRecord, updatePatientRecord, insertMedicine
};