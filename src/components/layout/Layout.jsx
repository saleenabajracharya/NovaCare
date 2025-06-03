import React from 'react'
import { NavBar } from '../navbar/NavBar';

export const Layout = ({ children }) => {
  

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background-color)", overflow: "hidden" }}>
      <NavBar />
      <div className="main-content pt-26">

        {children}
      </div>
    </div>
  );
}
