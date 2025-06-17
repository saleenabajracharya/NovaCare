const express = require('express');
const router = express.Router();
const { registerPatient } = require('../controllers/patientRecordController');

router.post('/patient', registerPatient);

module.exports = router;
