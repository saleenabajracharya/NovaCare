const { findDoctorByDepartment, findDoctorIdByDoctorName } = require('../models/doctorModel');

const getDoctorsByDepartment = async (req, res) => {
  try {
    const { department } = req.params;

    if (!department) {
      return res.status(400).json({ message: 'Department is required' });
    }

    const doctors = await findDoctorByDepartment(department);
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getDoctorByName = async (req, res) =>{
    try {
    const { fullName } = req.params;

    if (!fullName) {
      return res.status(400).json({ message: 'Doctor Name is required' });
    }

    const doctor = await findDoctorIdByDoctorName(fullName);
    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  getDoctorsByDepartment,
  getDoctorByName
};
