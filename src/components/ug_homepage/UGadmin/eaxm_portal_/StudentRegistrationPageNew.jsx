// StudentRegistrationPage.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DisplayFormData from "./DisplayFormData";
import StudentRegistrationForm from "./StudentRegistrationForm";


const StudentRegistrationPageNew = () => {
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
  const [Qualifications, setQualifications] = useState([]);
  const [selectedQualification, setselectedQualification] = useState('');
  const [displayFormData, setDisplayFormData] = useState(null);
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
    BatchId:"",
    edStatusId:"",
    NameOfCollege:"",
    passingYear:"",
    marks:"",
  });

//   const [fileState, setFileState] = useState({
//     files1: "",
//     filess: "",
//     filess3: "",
//   });

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFileState((prevState) => ({
//       ...prevState,
//       [name]: files[0],
//     }));
//   };

  useEffect(() => {
    fetchGenders();
    fetchCategories();
    fetchbatch();
    fetchQualifications();
    fetchState();
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
  const fetchbatch = async () => {
    try {
      const response = await axios.get('http://localhost:5001/StudentRegistationPage/batch'); // Adjust the endpoint URL based on your backend setup
      setBatchs(response.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchQualifications = async () => {
    try {
      const response = await axios.get('http://localhost:5001/StudentRegistationPage/Qualifications'); // Adjust the endpoint URL based on your backend setup
      setQualifications(response.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchState = async () => {
    try {
      const response = await axios.get('http://localhost:5001/StudentRegistationPage/states'); // Adjust the endpoint URL based on your backend setup
      setStates(response.data);
    } catch (error) {
      console.error('Error fetching states:', error);
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
  const handleQualificationChange = (event) => {
    const edStatusId  = event.target.value;
    setselectedQualification(edStatusId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "gender") {
      setSelectedGenderId(value);
    } else if (name === "category") {
      setSelectedCategoryId(value);
    } else if (name === "state_id") {
      setSelectedState(value);
    } else if (name === "districts_id") {
      setSelecteddistrict(value);
    } else if (name === "BatchId") {
      setSelectedBatch(value);
    } else if (name === "edStatusId") {
      setselectedQualification(value);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  

  
  
  // ... (your existing state and fetch functions)

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure required fields are filled
    const requiredFields = ['candidateName', 'dateOfBirth', 'emailId', 'confirmEmailId', 'contactNo'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`${field} is required.`);
        return;
      }
    }
  
    // Compare email and confirm email
    if (formData.emailId !== formData.confirmEmailId) {
      alert("Email and Confirm Email must match");
      return;
    }
  
    const contactNo = parseInt(formData.contactNo, 10);
    if (isNaN(contactNo)) {
      alert('Contact No must be a valid number');
      return;
    }
  
    const dataToSend = {
      ...formData,
      GenderId: selectedGenderId,
      CategoryId: selectedCategoryId,
      contactNo: contactNo,
      state_id: selectedState,
      districts_id: selecteddistrict,
      BatchId: selectedBatch,
      edStatusId: selectedQualification,
    };
  
    try {
      const response = await fetch(
        `http://localhost:5001/StudentRegistationPage/studentForm/${courseCreationId}`,
        {
          method: "POST",
          headers: {
            // Add headers if needed
          },
          body: JSON.stringify(dataToSend),
        }
      );
  
      if (response.ok) {
        console.log("Form submitted successfully");
        setFormData({
          // ... (clear the form data)
        });
      } else {
        const errorMessage = await response.text();
        console.error("Failed to submit form");
        alert("Failed to submit form: " + errorMessage);
      }
    } catch (error) {
      console.error("Error saving form data:", error);
      alert("Failed to submit form. Please try again later.");
    }
  };

const getGenderName = (genderId) => {
const gender = genders.find((g) => g.GenderId === parseInt(genderId));
return gender ? gender.Gander : "";
};

const getCategoryName = (categoryId) => {
const category = categories.find((c) => c.CategoryId === parseInt(categoryId));
return category ? category.Category : "";
};

const getStateName = (stateId) => {
const state = states.find((s) => s.state_id === parseInt(stateId));
return state ? state.name : "";
};

const getDistrictName = (districtId) => {
const district = districts.find((d) => d.districts_id === parseInt(districtId));
return district ? district.districts_name : "";
};

  const handleDisplayData = () => {
    // Set the entered data to be displayed
    setDisplayFormData(formData);
  };

  const handleBack = () => {
    // Clear the displayed data and go back to the form
    setDisplayFormData(null);
  };

  return (
    <div>
      {displayFormData ? (
        <DisplayFormData
          formData={displayFormData}
          onSubmit={handleFormSubmit}
          onBack={handleBack}
        />
      ) : (
        <StudentRegistrationForm
          formData={formData}
          genders={genders}  
          categories={categories}  
          states={states}  
          selectedState={selectedState}
          districts={districts}  
          selecteddistrict={selecteddistrict}
          Batchs={Batchs}  
          selectedBatch={selectedBatch}
          Qualifications={Qualifications} 
          selectedQualification={selectedQualification}
          handleStateChange={handleStateChange} 
          handledistrictChange={handledistrictChange}
          handleBatchChange={handleBatchChange}
          handleQualificationChange={handleQualificationChange}
          selectedGenderId={selectedGenderId}
          selectedCategoryId={selectedCategoryId}
          onChange={handleInputChange}
          onSubmit={handleFormSubmit}
          onDisplayData={handleDisplayData}
        //   handleFileChange={handleFileChange}
        />
      )}
    </div>
  );
};

export default StudentRegistrationPageNew;
