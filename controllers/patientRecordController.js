const { addPatientRecord, insertMedicine, getPatientRecord, todaysPatientRecord , removePatient, removePatients, getSinglePatientRecord, updatePatientRecord} = require('../models/patientRecordModel');

const updatePatient = async (req, res) => {
  const FormId = parseInt(req.params.FormId, 10);

  if (isNaN(FormId)) {
    return res.status(400).json({ message: "Invalid Form ID" });
  }

  const {
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
    prescribedMeds = []
  } = req.body;

  try {
    await updatePatientRecord(
      FormId,
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
    );

    if (prescribedMeds.length > 0) {
      await insertMedicine(FormId, prescribedMeds);
    }

    res.status(200).json({ message: "Patient record updated successfully" });
  } catch (error) {
    console.error("Error updating patient record:", error);
    res.status(500).json({ message: "Failed to update patient record" });
  }
};

const registerPatient = async (req, res) => {
  try {
    const {
      patientId, patientName, gender, age, address, phone, doctorId, doctorName, symptoms, reason, date, email,
      prescribedMeds = []
    } = req.body;

    if (!patientId || !patientName || !gender || !age || !phone || !doctorId || !reason) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    await addPatientRecord(
        patientId, patientName, gender, age, address, phone, doctorId, doctorName, symptoms, reason, date, email
    );

  
    if (prescribedMeds.length > 0) {
      await insertMedicine(formId, prescribedMeds);
    }

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

const removePatientData = async (req, res) => {
  const FormId = req.params.FormId;
  if (isNaN(FormId)) {
    return res.status(400).json({ message: "Invalid User ID" });

  } 
  try{
    await removePatient(FormId);
    res.status(200).json({ message: "Patient removed successfully" }); }
    catch (error) {
    console.error("Error removing patient record:", error);
    res.status(500).json({ message: "Failed to remove patient record" });
  }
      
}

const removeAllUserData = async (req, res) => {

  try{
    await removePatients();
    res.status(200).json({ message: "Patients removed successfully" }); }
    catch (error) {
    console.error("Error removing patients record:", error);
    res.status(500).json({ message: "Failed to remove users record" });
  }
      
}


module.exports = {
  registerPatient, getPatientData, todaysPatientData, getSinglePatient, updatePatient,
  removePatientData, removeAllUserData
};
