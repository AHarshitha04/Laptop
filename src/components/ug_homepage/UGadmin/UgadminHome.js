// Home.js

import React from 'react';
import Exam_portal_home_page from './eaxm_portal_/Exam_portal_home_page';


const UgadminHome = () => {
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    window.location.href = '/uglogin';
  };

  return (
    <div>
      <h2>Welcome to the Home Page!</h2>

      {userRole === 'admin' && (
        <div>
          <p>Admin View: Show all features</p>
          {/* Admin-specific content goes here */}
          <Exam_portal_home_page/>

        </div>
      )}

      {userRole === 'viewer' && (
        <div>
          <p>Viewer View: Show limited features</p>

          <Exam_portal_home_page/>
          {/* Viewer-specific content goes here */}
        </div>
      )}


    </div>
  );
};

export default UgadminHome;
