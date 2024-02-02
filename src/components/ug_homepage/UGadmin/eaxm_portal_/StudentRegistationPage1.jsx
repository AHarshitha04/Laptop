import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DateChange from "./DataChange";
import './Update.css'
import noimg from "./NoImages.jpg";

const StudentRegistrationPage = () => {
  const { courseCreationId } = useParams();
  const [courseData, setCourseData] = useState([]);
  const [genders, setGenders] = useState([]);
  const [categorys,setCategory] = useState([]);
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selecteddistrict, setSelecteddistrict] = useState('');
  const [Batchs, setBatchs] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [formState, setFormState] = useState({
    CandidateName: "",
    DataOfBirth: "",
    Gender: "",
    Category: "",
    EmailId: "",
    ConfirmEmailId: "",
    ContactNo: "",
    FathersName: "",
    Occupation: "",
    MobileNo: "",
    Addres: "",
    CityTown: "",
    State: "",
    Distric: "",
    PinCode: "",
    // Session: "",
    // Course: "",
    // Exam: "",
    // Stream1: "",
    batch: "",
    Qualification: "",
    NameOfCollage: "",
    Passingyear: "",
    MarksIn: "",
  });
  const [fileState, setFileState] = useState({
    files1: "",
    filess: "",
    filess3: "",
  });
  const validateForm = () => {
    const errors = {};
      if (!formState.CandidateName) {
        errors.CandidateName = "required *";
      }
      if (!formState.DataOfBirth) {
        errors.DataOfBirth = "required *";
      }
      if (!formState.Gender) {
        errors.Gender = "required *";
      }
      if (!formState.Category) {
          errors.Category = "required *";
        }
        if (!formState.EmailId) {
          errors.EmailId = "Email is required";
        }
        
        if (!formState.ConfirmEmailId) {
          errors.ConfirmEmailId = "Confirm Email is required";
        }
        
        if (formState.EmailId !== formState.ConfirmEmailId) {
          errors.ConfirmEmailId = "Email and Confirm Email must match";
        }
      // if (!formState.EmailId) {
      //     errors.EmailId = "required *";
      //   }
      // if (!formState.ConfirmEmailId) {
      //   errors.ConfirmEmailId = "required *";
      // }
      // if (!formState.ContactNo) {
      //   errors.ContactNo = "required *";
      // }
      if (!formState.ContactNo) {
        errors.ContactNo = "Mobile number is required";
      } else {
        // Define a regex pattern for a 10-digit mobile number
        const mobileNumberPattern = /^\d{10}$/;
      
        if (!mobileNumberPattern.test(formState.ContactNo)) {
          errors.ContactNo = "Invalid mobile number format";
        }
      }
      if (!formState.FathersName) {
        errors.FathersName = "required *";
      }
      if (!formState.Occupation) {
        errors.Occupation = "required *";
      }
      // if (!formState.MobileNo) {
      //   errors.MobileNo = "required *";
      // }
      if (!formState.MobileNo) {
        errors.MobileNo = "Mobile number is required";
      } else {
        // Define a regex pattern for a 10-digit mobile number
        const mobileNumberPattern = /^\d{10}$/;
      
        if (!mobileNumberPattern.test(formState.MobileNo)) {
          errors.MobileNo = "Invalid mobile number format";
        }
      }
      
      if (!formState.Addres) {
        errors.Addres = "required *";
      }
      if (!formState.CityTown) {
        errors.CityTown = "required *";
      }
      if (!formState.State) {
        errors.State = "required *";
      }
      if (!formState.Distric) {
        errors.Distric = "required *";
      }
      if (!formState.PinCode) {
        errors.PinCode = "required *";
      }
    //   if (!formState.Session) {
    //     errors.Session = "required *";
    //   }
    //   if (!formState.Course) {
    //     errors.Course = "required *";
    //   }
    //   if (!formState.Exam) {
    //     errors.Exam = "required *";
    //   }
    //   if (!formState.Stream1) {
    //     errors.Stream1 = "required *";
    //   }
      if (!formState.batch) {
        errors.batch = "required *";
      }
      if (!formState.Qualification) {
        errors.Qualification = "required *";
      }
      if (!formState.NameOfCollage) {
        errors.NameOfCollage = "required *";
      }
      if (!formState.Passingyear) {
        errors.Passingyear = "required *";
      }
      if (!formState.MarksIn) {
        errors.MarksIn = "required *";
      }
      // if (!formState.files1) {
      //   errors.files1 = "required *";
      // }
      // if (!formState.filess) {
      //   errors.filess = "required *";
      // }
      // if (!formState.filess3) {
      //   errors.filess3 = "required *";
      // }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
  

    fetchcourse();
  }, [courseCreationId]);


  const fetchcourse = async () => {
    try {
      const response = await fetch(`http://localhost:5001/StudentRegistationPage/coursedataSRP/${courseCreationId}`);
      const data = await response.json();
      setCourseData(data);
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  };
  

  useEffect(() => {
    fetchgender();
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await fetch("http://localhost:5001/StudentRegistationPage/Category");
      const data = await response.json();
      setCategory(data);
    } catch (error) {
      console.error('Error fetching Category data:', error);
    }
  };

  const fetchgender = async () => {
    try {
      const response = await fetch("http://localhost:5001/StudentRegistationPage/gender");
      const data = await response.json();
      setGenders(data);
    } catch (error) {
      console.error('Error fetching gender data:', error);
    }
  };
  

  useEffect(() => {
    const fetchState = async () => {
      try {
        const response = await axios.get('http://localhost:5001/StudentRegistationPage/states'); // Adjust the endpoint URL based on your backend setup
        setStates(response.data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchState();
  }, []);

  const handleStateChange = async (event) => {
    const state_id = event.target.value;
    setSelectedState(state_id);

    try {
      const response = await axios.get(`http://localhost:5001/StudentRegistationPage/districts/${state_id}`);
      setDistricts(response.data);
      setSelecteddistrict('');
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFileState((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  useEffect(() => {
    const fetchbatch = async () => {
      try {
        const response = await axios.get('http://localhost:5001/StudentRegistationPage/batch'); // Adjust the endpoint URL based on your backend setup
        setBatchs(response.data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchbatch();
  }, []);
  
  
  const handledistrictChange = (event) => {
    const newDistrictId = event.target.value;
    setSelecteddistrict(newDistrictId);
  };

  const handleBatchChange = (event) => {
    const BatchId  = event.target.value;
    setSelectedBatch(BatchId);
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Submited')
      // Form is valid, continue with submission
      const formData = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        formData.append(key, value);
      });
      Object.entries(fileState).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

     
      axios.post("http://localhost:5001/student", formData, config)
        .then((res) => {
          console.log(res);
          navigate("/login_UserData");

        })
        .catch((err) => console.log(err));
    }
  };
  console.log(handleSubmit);
  return (
    <div className="regForm">
      <h1>Student Registration Page</h1>
      <form className="reg_form_section" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
        <section>
        <div className="headTitles">
            <h2>REGISTRATION DETAILS</h2>
          </div>
          <div className="inputContent">
              <label htmlFor="">CANDIDATE NAME <span>*</span></label>
              <div className="input-filde">
                <input
                  type="text"
                  name="CandidateName"
                  className="inputss"
                  onChange={handleInputChange}
                />
                <span className="errorText">{formErrors.CandidateName}</span>
              </div>
            </div>
            {/* DataOfBirth----------- */}
            <div className="inputContent">
              <label htmlFor="">DATE OF BIRTH <span>*</span></label>
              <div className="input-filde">
              <DateChange 
                name="DataOfBirth"
                // value={value}
                onChange={handleInputChange}/>
                <span className="errorText">{formErrors.DataOfBirth}</span>
              </div>
            </div>
            {/* GENDER----------- */}
            <div className="inputContent">
            <label htmlFor="">GENDER <span>*</span></label>
      {genders.map((gender) => (
        <div key={gender.GenderId}>
          <input type="radio" id={gender.GenderId} name="Gender" value={gender.GenderId} />
          <label htmlFor={gender.GenderId}>{gender.Gander}</label>
        </div>
      ))}
    </div>
    {/* CATEGORY----------- */}
    <div className="inputContent">
    <label htmlFor="">CATEGORY <span>*</span></label>
      {categorys.map((Category) => (
        <div key={Category.CategoryId}>
          <input type="radio" id={Category.CategoryId} name="Category" value={Category.CategoryId} />
          <label htmlFor={Category.CategoryId}>{Category.Category}</label>
        </div>
      ))}
    </div>
    {/* EMAIL ID----------- */}
    <div className="inputContent">
              <label htmlFor="">EMAIL ID <span>*</span></label>
              <div className="input-filde">
                <input
                  type="email"
                  name="EmailId"
                  className="inputss"
                  onChange={handleInputChange}
                />
                <span className="errorText">{formErrors.EmailId}</span>
              </div>
            </div>
            {/*CONFIRM EMAIL ID----------- */}
            <div className="inputContent">
              <label htmlFor="">CONFIRM EMAIL ID <span>*</span></label>
              <div className="input-filde">
                <input
                  type="email"
                  name="ConfirmEmailId"
                  className="inputss"
                  onChange={handleInputChange}
                />
                <span className="errorText">{formErrors.ConfirmEmailId}</span>
              </div>
            </div>
            {/*  CONTACT NO----------- */}
            <div className="inputContent">
              <label htmlFor="">CONTACT NO <span>*</span></label>
              <div className="input-filde">
                <input
                  type="number"
                  name="ContactNo"
                  className="inputss"
                  onChange={handleInputChange}
                />
                <span className="errorText">{formErrors.ContactNo}</span>
              </div>
            </div>
        </section>
        {/* FATHER'S/GUARDIAN'S DETAILS------------------------------ */}
        <section>
          <div className="headTitles">
            <h2>FATHER'S/GUARDIAN'S DETAILS</h2>
          </div>

          <div className="content_reg ">
{/* FATHER'S NAME----------- */}
            <div className="inputContent">
              <label htmlFor="">FATHER'S NAME <span>*</span></label>
              <div className="input-filde">
                <input
                  type="text"
                  name="FathersName"
                  className="inputss"
                  onChange={handleInputChange}
                />
                <span className="errorText">{formErrors.FathersName}</span>
              </div>
            </div>
{/* OCCUPATION----------- */}
            <div className="inputContent">
              <label htmlFor="">OCCUPATION <span>*</span></label>
              <div className="input-filde">
                <input
                  type="text"
                  name="Occupation"
                  className="inputss"
                  onChange={handleInputChange}
                />
                <span className="errorText">{formErrors.Occupation}</span>
              </div>
            </div>
{/* MOBILE NO ----------- */}
            <div className="inputContent">
              <label htmlFor="">MOBILE NO <span>*</span></label>
              <div className="input-filde">
                <input
                  type="text"
                  name="MobileNo"
                  className="inputss"
                  onChange={handleInputChange}
                />
                <span className="errorText">{formErrors.MobileNo}</span>
              </div>
            </div>

        </div>
        </section>
        {/* COMMUNICATION ADDRESS------------------------------ */}
<section>
<div className="headTitles">
            <h2>COMMUNICATION ADDRESS</h2>
          </div>
          <div className="content_reg ">
         
          <div className="inputContent">
          <h2>Select a State</h2>
      <select onChange={handleStateChange} value={selectedState}>
        <option value="" disabled>
          Choose a state
        </option>
        {states.map((state) => (
          <option key={state.state_id} value={state.state_id}>
            {state.name}
          </option>
        ))}
      </select>

      </div>
      <div className="inputContent">
{selectedState && (
        <div>
          <h2>Select a District</h2>
          <select onChange={handledistrictChange}  value={selecteddistrict} >
            <option value="" disabled>
              Choose a district
            </option>
            {districts.map((district) => (
              <option key={district.districts_id } value={district.districts_id }>
                {district.districts_name}
              </option>
            ))}
          </select>
        </div>
      )}</div>

      {/* CITY/TOWN ----------- */}
      <div className="inputContent">
              <label htmlFor="">CITY/TOWN <span>*</span></label>
              <div className="input-filde">
                <input
                  type="text"
                  name="CityTown"
                  className="inputss"
                  onChange={handleInputChange}
                />
                <span className="errorText">{formErrors.CityTown}</span>
              </div>
            </div>
            {/* LINE 1 ----------- */}
          <div className="inputContent">
              <label htmlFor="">LINE 1 <span>*</span></label>
              <div className="input-filde">
                <input
                  type="text"
                  name="Addres"
                  className="inputss"
                  onChange={handleInputChange}
                />
                <span className="errorText">{formErrors.Addres}</span>
              </div>
            </div>
{/* PINCODE ----------- */}
<div className="inputContent">
              <label htmlFor="">PINCODE <span>*</span></label>
              <div className="input-filde">
                <input
                  type="text"
                  name="PinCode"
                  className="inputss"
                  onChange={handleInputChange}
                />
                <span className="errorText">{formErrors.PinCode}</span>
              </div>
            </div>

             </div>
</section>
{/* COURSE DETAILS------------------------------ */}
<section>
<div className="headTitles">
            <h2>COURSE DETAILS</h2>
          </div>
          <div className="content_reg ">
        <div className="inputContent">
          {courseData.map((course) => (
            <div key={course.courseCreationId}>
              <p>EXAM: {course.examName}</p>
              <p>SESSION: {course.courseYear}</p>
              <p>COURSE: {course.courseName}</p>
              <p>SUBJECTS :{course.subjects.join(', ')}</p>
            </div>
          ))}
          </div>

          <div className="inputContent">
          <h2>BATCH</h2>
      <select onChange={handleBatchChange} value={selectedBatch}>
        <option value="" disabled>
          Choose a Batch
        </option>
        {Batchs.map((Batch) => (
          <option key={Batch.BatchId } value={Batch.BatchId }>
            {Batch.Batch}
          </option>
        ))}
      </select>

      </div>
        </div>
        </section>
{/* EDUCATION DETAILS------------------------------ */}  
<section>
          <div className="headTitles">
            <h2>EDUCATION DETAILS</h2>
          </div>

          <div className="content_reg ">
{/*QUALIFICATION ----------- */}
            <div className="inputContent">
              <label htmlFor="">QUALIFICATION <span>*</span></label>
              <div className="input-filde">
               <select  name="Qualification" className='inputss' onChange={handleInputChange}>
                  <option >--Select</option>
                  <option value="APPEARING  XII">APPEARING XII</option>
                  <option value="PASSED  XII"> PASSED  XII </option>    
               </select>
               <span className="errorText">{formErrors.Qualification}</span>
              </div>
            </div>
{/* NAME OF COLLEGE (WITH CITY) ----------- */}
            <div className="inputContent">
              <label htmlFor="">NAME OF COLLEGE (WITH CITY) <span>*</span></label>
              <div className="input-filde">
                <input
                  type="text"
                  name="NameOfCollage"
                  className="inputss"
                  onChange={handleInputChange}
                />
                <span className="errorText">{formErrors.NameOfCollage}</span>
              </div>
            </div>
{/* PASSING YEAR ----------- */}
            <div className="inputContent">
              <label htmlFor="">PASSING YEAR <span>*</span></label>
              <div className="input-filde">
                <input
                  type="text"
                  name="Passingyear"
                  className="inputss"
                  onChange={handleInputChange}
                />
                <span className="errorText">{formErrors.Passingyear}</span>
              </div>
            </div>
{/*> MARKS IN % ----------- */}
            <div className="inputContent">
              <label htmlFor="">MARKS IN % <span>*</span></label>
              <div className="input-filde">
                <input
                  type="text"
                  name="MarksIn"
                  className="inputss"
                  onChange={handleInputChange}
                />
                <span className="errorText">{formErrors.MarksIn}</span>
              </div>
            </div>

            
          </div>
        </section>

{/* UPLOAD IMAGE / DOCUMENTS -----------*/}
<section>
          <div className="headTitles">
            <h2>UPLOAD IMAGE / DOCUMENTS</h2>
          </div>
          <div className="content_reg ">

 {/* UPLOAD PHOTO  -----------*/}
            <div className="imgSection">
              <h3>UPLOAD PHOTO <span>*</span> </h3>
              <img src={noimg} width={144} height={144} alt="asaS" />
              <div className="input-filde">
                <input
                required
                  type="file"
                  name="files1"
                  onChange={handleFileChange}
                />
                <span className="errorText">{formErrors.files1}</span>
              </div>
            </div>
 {/* >UPLOAD SIGNATURE   -----------*/}
            <div className="imgSection">
              <h3>UPLOAD SIGNATURE  <span>*</span> </h3>
              <img src={noimg} width={144} height={144} alt="asaS" />
              <div className="input-filde">
                <input
                  type="file"
                  name="filess"
                  onChange={handleFileChange}
                />
                <span className="errorText">{formErrors.filess}</span>
              </div>
            </div>
 {/* UPLOAD ID PROOF   -----------*/}
            <div className="imgSection">
              <h3>UPLOAD ID PROOF  <span>*</span> </h3>
              <img src={noimg} width={144} height={144} alt="asaS" />
              <div className="input-filde">
                <input
                  type="file"
                  name="filess3"
                  onChange={handleFileChange}
                />
                <span className="errorText">{formErrors.filess3}</span>
              </div>
            </div>

           
          </div>
        </section>

        <div className="submitBTn">
          <input className="btnSubmit" type="submit" value="submit" />
        </div>
        
        </form>
    </div>
  );
};

export default StudentRegistrationPage;
