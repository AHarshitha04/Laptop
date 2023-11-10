import React from "react";
import { UgAboutVisionMission } from "./Ug_data";
import Logo from "../../Images/browser-removebg-preview.png";
import "./ug_About.css";

export const Ug_About = () => {
  return (
    <div style={{ background: "#red" }} className="Ug_ABout_Section">
      <div className="Pg_Container">
        {/* {UgNaveList.map((aboutUrl,aboutIndex) => {
  return(
    <div key={aboutIndex}>
      <div id={aboutUrl.urlcontact}></div>
    </div>
  )
})} */}

        <div className="UG_ABOUT_US ">
          <h1>ABOUT US</h1>
          <div className=" Ug_About">
            <img style={{ borderRadius: "10px" }} src={Logo} alt="" />
            {/* this is about us  & logo */}
            <div className=" aboutContant_Ug ">
              <p className="" style={{ textAlign: "justify" }}>
                eGRADTutor is an Edtech firm started with a vision to blend the
                boundaries in education and take best-in-class courses and
                teachers virtually to every corner of the country. Our courses
                are developed by the alumni of IIT/IISc with an intent to
                enhance the student's abilities to face some of the toughest
                exams of the country. Our offerings not just provide a deeper
                understanding of the subjects to the students, but they also
                make them exam ready.
              </p>
            </div>
          </div>
        </div>
        {/* This is Mission and Vission code, this is HTML code we will get the data from AboutItem.js */}
        <div className=" VISIONMISSION_Ug">
          <div className="vistionMission-section_Ug">
            {/* we using map function for getting the data from AboutItem.js And anything we need to change we need to go the same file. */}
            {UgAboutVisionMission.map((vistion, Mistion) => {
              return (
                <div key={Mistion} className={vistion.vistionMisstion}>
                  {/* <div className={vistion.imageClass}>
                <img src={vistion.vision} alt='image from about Items' />
              </div> */}
                  <div className={vistion.contantClass}>
                    <div className="Abou_Center">
                      <div className="contant_Ug_text">
                        <h3>{vistion.Title}</h3>
                        <p>{vistion.Ptext}</p>
                      </div>
                      <ul className="ulList_Ug">
                        <p>{vistion.Values}</p>
                        <li className={vistion.contantClassForUl}>
                          {vistion.Points1}
                        </li>
                        <li className={vistion.contantClassForUl}>
                          {vistion.Points2}
                        </li>
                        <li className={vistion.contantClassForUl}>
                          {vistion.Points3}
                        </li>
                        <li className={vistion.contantClassForUl}>
                          {vistion.Points4}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
