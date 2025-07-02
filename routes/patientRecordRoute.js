const express = require('express');
const router = express.Router();
const { registerPatient, getPatientData , todaysPatientData, getSinglePatient, removePatientData, removeAllUserData , updatePatient} = require('../controllers/patientRecordController');

router.post('/patient', registerPatient);
router.put("/patient/:FormId", updatePatient);
router.put("/patients/:FormId", removePatientData);
router.put('/patients', removeAllUserData);

router.get('/patient/:FormId', getSinglePatient); 
router.get('/patients', getPatientData);
router.get('/patientstoday', todaysPatientData);

module.exports = router;
