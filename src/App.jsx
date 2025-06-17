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
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from "react";

function parseJwt(token) {
  if (!token) return null;
  try {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

function isTokenExpired(token) {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return true;
  const now = Date.now() / 1000;
  return payload.exp < now;
}



function App() {
  function logout() {
    localStorage.clear('users');  
    return <Navigate to={'/sign-in'} />;
  }
  useEffect(() => {
    const token = localStorage.getItem('user:token');
    if (!token || isTokenExpired(token)) {
      logout();
      return;
    }
    
    const payload = parseJwt(token);
    const timeLeft = (payload.exp * 1000) - Date.now();

    const timer = setTimeout(() => {
      logout();
    }, timeLeft);

    return () => clearTimeout(timer);
  }, []);

  const ProtectedRoutes = ({ children, auth = false }) => {
    const isLoggedIn = localStorage.getItem('user:token') !== null || false;
    if (!isLoggedIn && auth) {
      return <Navigate to={'/sign-in'} />;
    }
    else if (isLoggedIn && ['/sign-in', '/sign-up'].includes(window.location.pathname)) {
      return <Navigate to={'/'} />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
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
          path='/sign-in'
          element={
            <ProtectedRoutes>
              <Form key="sign-in" isSignInPage={true} />
            </ProtectedRoutes>
          }
        />

        <Route
          path='/sign-up'
          element={
            <ProtectedRoutes>
              <Form key="sign-up" isSignInPage={false} />
            </ProtectedRoutes>
          }
        />


        {/* Home/Dashboard route (requires authentication) */}
        <Route
          path='/'
          element={
            <ProtectedRoutes auth={true}>
              <Dashboard />
            </ProtectedRoutes>
          }
        />

        <Route
          path='/new-form'
          element={
            <PatientForm />
          }
        />
        <Route
          path='/patient-history'
          element={
            <PatientHistory />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
