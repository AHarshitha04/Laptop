
// Home.js

import React from 'react';
import Exam_portal_home_page from './eaxm_portal_/Exam_portal_home_page';
import Quiz_dashboard from './eaxm_portal_/Quiz_dashboard';


const UgadminHome = () => {
  
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    window.location.href = '/uglogin';
  };

  return (
    <div>
     
      {userRole === "admin" && (
        <div>
          {/* <p>admin View: Show limited features</p> */}

          <Quiz_dashboard />

          {/* Viewer-specific content goes here */}
        </div>
      )}

      {userRole === "ugotsadmin" && (
        <div>
          {/* <p>ugotsadmin View: Show limited features</p> */}

          <Quiz_dashboard />

          {/* Viewer-specific content goes here */}
        </div>
      )}

      {userRole === "ugadmin" && (
        <div>
          {/* <p>ugadmin View: Show limited features</p> */}

          <Quiz_dashboard />

          {/* Viewer-specific content goes here */}
        </div>
      )}

      {userRole === "viewer" && (
        <div>
          <p>Viewer View: Show limited features</p>

          <Exam_portal_home_page />
          {/* Viewer-specific content goes here */}
        </div>
      )}

      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default UgadminHome;
