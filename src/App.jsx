import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import './App.css'
import Form from './components/modules/Form'
import { NoPage } from './components/modules/NoPage';
import { Dashboard } from './components/modules/Dashboard';
import { NavBar } from './components/navbar/NavBar';
import { Profile } from './components/modules/Profile';
import PatientForm from './components/modules/PatientForm';
import PatientHistory from './components/modules/patientHistory';
import PrescribedMeds from './components/modules/PrescribedMeds';

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/login'
          element={
              <Form isSignInPage={true} /> 
          }
        />
        <Route
          path='/*'
          element={
              <NoPage /> 
          }
        />
        <Route
          path='/profile'
          element={
              <Profile /> 
          }
        />
        <Route
          path='/'
          element={
              <PrescribedMeds /> 
          }
        />
        <Route
          path='/sign-up'
          element={
              <Form isSignInPage={false} /> 
          }
        />

        <Route
          path='/new-form'
          element={
              <PatientForm/> 
          }
        />
         <Route
          path='/patient-history'
          element={
              <PatientHistory/> 
          }
        />
    </Routes>
    </BrowserRouter>
  )
}

export default App
