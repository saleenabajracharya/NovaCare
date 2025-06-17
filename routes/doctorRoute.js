const express = require('express');
const router = express.Router();
const { getDoctorsByDepartment, getDoctorByName } = require('../controllers/doctorController');

router.get('/department/:department', getDoctorsByDepartment);
router.get('/doctor/:fullName', getDoctorByName);

module.exports = router;