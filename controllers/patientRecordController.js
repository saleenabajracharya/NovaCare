const { addPatientRecord } = require('../models/patientRecordModel');

const registerPatient = async (req, res) => {
  try {
    const {
      patientId, patientName, gender, age, address, phone, doctorId, doctorName, symptoms, reason
    } = req.body;

    if (!patientId || !patientName || !gender || !age || !phone || !doctorId || !reason) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    await addPatientRecord(
        patientId, patientName, gender, age, address, phone, doctorId, doctorName, symptoms, reason
    );

    res.status(201).json({ message: 'Patient record added successfully.' });
  } catch (error) {
    console.error('Error registering patient:', error);
    res.status(500).json({ message: 'Server error while registering patient.' });
  }
};

module.exports = {
  registerPatient,
};
