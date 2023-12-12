import React, { useEffect, useRef, useState } from "react";
import {
  General_intructions_page_content,
  Navbar,
} from "./DATA/Introduction_page_DATA";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineArrowRight } from "react-icons/ai";
// import Paper from "../Paper/Paper";

// import Paper1 from '../Paper/Paper1'
// import Paper1 from '../Paper/Paper1';

const General_intructions_page = () => {
  return (
    <>
      <General_intructions_page_header />
      <General_intructions_page_container seconds={600} />
    </>
  );
};

export default General_intructions_page;

export const General_intructions_page_header = () => {
  return (
    <>
      {Navbar.map((nav, index) => {
        return (
          <div className="Quiz_General_header" key={index}>
            <h1>{nav.Q_page_title}</h1>
            <div className="Q_title">{/* <p>{nav.time_limt}</p> */}</div>
          </div>
        );
      })}
    </>
  );
};

export const General_intructions_page_container = ({ seconds }) => {
  
  const [countdown, setCountdown] = useState(seconds);
  const timerId = useRef();

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(timerId.current);
      alert("End");
    }
  }, [countdown]);
  const navigate = useNavigate();
  const startCountdown = () => {
    timerId.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    navigate("/Paper1");
  };
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const [instructionsData, setInstructionsData] = useState([]);
  const { examid, subjectId } = useParams();
  console.log("examid:", examid);

  useEffect(() => {
    const fetchInstructions = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/fetchinstructions/${examid}/`
        );
        const data = await response.json();
        setInstructionsData(data);
        // setSubjectData(instructionsData);
        // console.log(instructionsData)
      } catch (error) {
        console.error(error);
      }
    };

    fetchInstructions();
  }, [examid, subjectId]);

  const [SubjectData, setSubjectData] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/subjectData/${subjectId}`
        );
        const data = await response.json();
        setSubjectData(data);
        console.log(SubjectData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSubjects();
  }, [subjectId]);


  return (
    <>
      <div>
        <h2>General Instructions</h2>
        {/* <ul>
          {instructionsData.map((instruction, index) => (
            <React.Fragment key={instruction.id}>
              {index === 0 && <li>{instruction.instructionHeading}</li>}
              <li>{instruction.points}</li>
            </React.Fragment>
          ))}
        </ul> */}
      </div>

      <div>
        {/* <input type="checkbox" onClick={checkbox}/> */}

        <div className="gn_checkbox">
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            className="checkbox"
          />
          <p>
            {" "}
            I agree to these <b> Terms and Conditions.</b>
          </p>
        </div>
      </div>

      <div className="gn_next_btn_container">
        {isChecked ? (
       

            <Link
            to={`/subjects/${examid}/${subjectId}`}
            className="gn_next_btn"
            >
            I am ready to begin <AiOutlineArrowRight />
          </Link>
       
        ) : (
          <div>
            <span className="disabled-link gn_next_btn_bull ">
              I am ready to begin <AiOutlineArrowRight />
            </span>
          </div>
        )}
      </div>

     
    </>
  );
};
