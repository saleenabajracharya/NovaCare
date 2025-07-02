// 
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Import routes
const authRoutes = require('./routes/authRoute');
const patientRecordRoutes = require('./routes/patientRecordRoute');
const doctorsRoutes = require('./routes/doctorRoute');
const userRoutes = require('./routes/userRoute');
const authenticate = require('./middlewares/authMiddleware');

app.use('/data', doctorsRoutes);
app.use('/data', userRoutes);
app.use('/record', patientRecordRoutes);
app.use('/api',authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



