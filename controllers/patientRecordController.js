const { addPatientRecord, getPatientRecord, todaysPatientRecord , getSinglePatientRecord} = require('../models/patientRecordModel');

const registerPatient = async (req, res) => {
  try {
    const {
      patientId, patientName, gender, age, address, phone, doctorId, doctorName, symptoms, reason, date, email
    } = req.body;

    if (!patientId || !patientName || !gender || !age || !phone || !doctorId || !reason) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    await addPatientRecord(
        patientId, patientName, gender, age, address, phone, doctorId, doctorName, symptoms, reason, date, email
    );

    res.status(201).json({ message: 'Patient record added successfully.' });
  } catch (error) {
    console.error('Error registering patient:', error);
    res.status(500).json({ message: 'Server error while registering patient.' });
  }
};

const getPatientData = async (req, res) =>{
    try {
    const patients = await getPatientRecord();
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

const todaysPatientData = async(req,res) => {
  try{
  const { department } = req.query;
  if (!department) {
      return res.status(400).json({ message: 'Department Name is required' });
    }
    const patients = await todaysPatientRecord(department);
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

const getSinglePatient = async (req, res) =>{
    try {
    const { FormId } = req.params;

    if (!FormId) {
      return res.status(400).json({ message: 'Error occured' });
    }

    const patient = await getSinglePatientRecord(FormId);
    res.status(200).json(patient);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Server error' });
  }
}


module.exports = {
  registerPatient, getPatientData, todaysPatientData, getSinglePatient
};
