import React from "react";
import "./styles/EmployeePortalHomepage.css";
const EmployeePortalHomepage = () => {
  return (
    <>
      {/* -------------- header--------------------- */}
      <EmployeePortalHomepageHeader />
      <EmployeePortalHomepageLogin />
    </>
  );
};

export default EmployeePortalHomepage;

// ----------------- EmployeePortalHomepageHeader --------------------

{
  /* -------------- header logo--------------------- */
}
import egradtutorlogo from "./assets/logo.png";

export const EmployeePortalHomepageHeader = () => {
  return (
    <div>
      <div className="EmployeePortalHomepageHeader_container">
        <div className="EmployeePortalHomepageHeader_subcontainer">
          <div className="EmployeePortalHomepageHeader_logo">
            <img src={egradtutorlogo} alt="logo" />
          </div>
          <div className="EmployeePortalHomepageHeader_nav_menu_container">
            {/* <div className="EmployeePortalHomepageHeader_nav_menu"></div> */}
            <div className="EmployeePortalHomepageHeader_nav_menu_btns_container">
              <button className="btn">Register</button>
            </div>
          </div>
        </div>

        <div className="EmployeePortalHomepageLogin_register_container">
          <label htmlFor="">
            <input type="text" placeholder="First Name" />
          </label>

          <label htmlFor="">
            <input type="text" placeholder="Last Name" />
          </label>

          <label htmlFor="">
            <input type="email" placeholder="Email" />
          </label>

          <label htmlFor="">
            <input type="password" placeholder="password" />
          </label>

          <label htmlFor="">
            <input type="date" placeholder="Date of brith" />
          </label>

          <label htmlFor="">
            <input type="radio" />
            Female
          </label>

          <label htmlFor="">
            <input type="radio" />
            Male
          </label>

          <label htmlFor="">
            <input type="radio" />
            Male
          </label>
        </div>
      </div>
    </div>
  );
};

export const EmployeePortalHomepageLogin = () => {
  return (
    <>
      <div className="EmployeePortalHomepageLogin_login_container">
        <form>
          <label htmlFor="">
            <input type="email" />
          </label>

          <label htmlFor="">
            <input type="password" />
          </label>

          <button className="btn">login</button>
        </form>
      </div>
    </>
  );
};
