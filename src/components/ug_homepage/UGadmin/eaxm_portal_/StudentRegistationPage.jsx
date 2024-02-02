import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
const StudentRegistrationPage = () => {
  const { courseCreationId } = useParams();
  const [courseData, setCourseData] = useState([]);
  const [genders, setGenders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedGenderId, setSelectedGenderId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selecteddistrict, setSelecteddistrict] = useState('');
  const [Batchs, setBatchs] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [formData, setFormData] = useState({
    candidateName: "",
    dateOfBirth: "",
    emailId: "",
    confirmEmailId: "",
    contactNo: "",
    GenderId: "",
    CategoryId: "",
    fatherName:"",
    occupation:"",
    mobileNo:"",
    line1:"",
    state_id:"",
    districts_id:"",
    pincode:"",
    BatchId:""
  });

  useEffect(() => {
    fetchGenders();
    fetchCategories();
  }, []);

  const fetchGenders = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/StudentRegistationPage/gender"
      );
      const data = await response.json();
      setGenders(data);
    } catch (error) {
      console.error("Error fetching gender data:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/StudentRegistationPage/Category"
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching Category  data:", error);
    }
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

  const handledistrictChange = (event) => {
    const newDistrictId = event.target.value;
    setSelecteddistrict(newDistrictId);
  };

  const handleBatchChange = (event) => {
    const BatchId  = event.target.value;
    setSelectedBatch(BatchId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "gender") {
      setFormData({
        ...formData,
        [name]: value,
      });
      setSelectedGenderId(value);
    } else if (name === "category") {
      setFormData({
        ...formData,
        [name]: value,
      });
      setSelectedCategoryId(value);
    } else if (name === "state_id") {
      setFormData({
        ...formData,
        [name]: value,
      });
      setSelectedState(value);
    } else if (name === "districts_id") {
      setFormData({
        ...formData,
        [name]: value,
      });
      setSelecteddistrict(value);
    } else if (name === "BatchId") {
      setFormData({
        ...formData,
        [name]: value,
      });
      setSelectedBatch(value);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Selected State:", selectedState);
    console.log("Selected District:", selecteddistrict);
    const contactNo = parseInt(formData.contactNo, 10);
    if (isNaN(contactNo)) {
      alert('Contact No must be a valid number');
      return;
    }
    // Compare email and confirm email
    if (formData.emailId !== formData.confirmEmailId) {
      alert("Email and Confirm Email must match");
      return;
    }

    const dataToSend = {
      ...formData,
      GenderId: selectedGenderId,
      CategoryId: selectedCategoryId,
      contactNo: contactNo,
      state_id: selectedState,
      districts_id:selecteddistrict,
      BatchId:selectedBatch,
    };

    console.log("Data to send:", dataToSend); // Add this console log

    try {
      const response = await fetch(
        "http://localhost:5001/StudentRegistationPage/studentForm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (response.ok) {
        console.log("Form submitted successfully");
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section>
          <h1>Student Registration Page</h1>
          <div>
            <label htmlFor="candidateName">CANDIDATE NAME(accoding to 10th memo):</label>
            <input
              type="text"
              id="candidateName"
              name="candidateName"
              value={formData.candidateName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="dateOfBirth">DATE OF BIRTH:</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>GENDER:</label>
            {genders.map((gender) => (
              <div key={gender.GenderId}>
                <input
                  type="radio"
                  id={gender.GenderId}
                  name="gender"
                  value={gender.GenderId}
                  checked={parseInt(selectedGenderId) === gender.GenderId}
                  onChange={handleInputChange}
                />
                <label htmlFor={gender.GenderId}>{gender.Gander}</label>
              </div>
            ))}
          </div>

          {/* CATEGORY: */}
          <div>
            <label>CATEGORY:</label>
            {categories.map((category) => (
              <div key={category.CategoryId}>
                <input
                  type="radio"
                  id={category.CategoryId}
                  name="category"
                  value={category.CategoryId}
                  checked={parseInt(selectedCategoryId) === category.CategoryId}
                  onChange={handleInputChange}
                />
                <label htmlFor={category.CategoryId}>{category.Category}</label>
              </div>
            ))}
          </div>
          <div>
            <label htmlFor="emailId">EMAIL ID:</label>
            <input
              type="email"
              id="emailId"
              name="emailId"
              value={formData.emailId}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="confirmEmailId">CONFIRM EMAIL ID:</label>
            <input
              type="email"
              id="confirmEmailId"
              name="confirmEmailId"
              value={formData.confirmEmailId}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="contactNo">CONTACT NO:</label>
            <input
              type="number"
              id="contactNo"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleInputChange}
            />
          </div>
        </section>
        <section>
          <h2>FATHER'S/GUARDIAN'S DETAILS</h2>
          <div>
            <label htmlFor="fatherName">FATHER'S NAME:</label>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="occupation">OCCUPATION:</label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleInputChange}
            />
          </div>


          <div>
            <label htmlFor="mobileNo">MOBILE NO:</label>
            <input
              type="number"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
            />
          </div>
        </section>

        <section>
          <h2>COMMUNICATION ADDRESS</h2>
          <div>
            <label htmlFor="line1">LINE1:</label>
            <input
              type="text"
              id="line1"
              name="line1"
              value={formData.line1}
              onChange={handleInputChange}
            />
          </div>

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
      <div >
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

<div>
            <label htmlFor="pincode">PINCODE:</label>
            <input
              type="number"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
            />
          </div>

        </section>
        <h2>COURSE DETAILS</h2>
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
        <section>

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
          
        </section>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default StudentRegistrationPage;
