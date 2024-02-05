// import React, { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom';
// import axios from "axios";
// import noimg from "./NoImages.jpg";
// const StudentRegistrationPage = () => {
//   const { courseCreationId } = useParams();
//   const [courseData, setCourseData] = useState([]);
//   const [genders, setGenders] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedGenderId, setSelectedGenderId] = useState("");
//   const [selectedCategoryId, setSelectedCategoryId] = useState("");
//   const [states, setStates] = useState([]);
//   const [selectedState, setSelectedState] = useState('');
//   const [districts, setDistricts] = useState([]);
//   const [selecteddistrict, setSelecteddistrict] = useState('');
//   const [Batchs, setBatchs] = useState([]);
//   const [selectedBatch, setSelectedBatch] = useState('');
//   const [Qualifications, setQualifications] = useState([]);
//   const [selectedQualification, setselectedQualification] = useState('');
//   const [formData, setFormData] = useState({
//     candidateName: "",
//     dateOfBirth: "",
//     emailId: "",
//     confirmEmailId: "",
//     contactNo: "",
//     GenderId: "",
//     CategoryId: "",
//     fatherName:"",
//     occupation:"",
//     mobileNo:"",
//     line1:"",
//     state_id:"",
//     districts_id:"",
//     pincode:"",
//     BatchId:"",
//     edStatusId:"",
//     NameOfCollege:"",
//     passingYear:"",
//     marks:"",
//   });
//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFileState((prevState) => ({
//       ...prevState,
//       [name]: files[0],
//     }));
//   };
//   const [fileState, setFileState] = useState({
//     files1: "",
//     filess: "",
//     filess3: "",
//   });
//   useEffect(() => {
//     fetchGenders();
//     fetchCategories();
//   }, []);

//   const fetchGenders = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:5001/StudentRegistationPage/gender"
//       );
//       const data = await response.json();
//       setGenders(data);
//     } catch (error) {
//       console.error("Error fetching gender data:", error);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:5001/StudentRegistationPage/Category"
//       );
//       const data = await response.json();
//       setCategories(data);
//     } catch (error) {
//       console.error("Error fetching Category  data:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchbatch = async () => {
//       try {
//         const response = await axios.get('http://localhost:5001/StudentRegistationPage/batch'); // Adjust the endpoint URL based on your backend setup
//         setBatchs(response.data);
//       } catch (error) {
//         console.error('Error fetching states:', error);
//       }
//     };

//     fetchbatch();
//   }, []);
  
//   useEffect(() => {
//     const fetchQualifications = async () => {
//       try {
//         const response = await axios.get('http://localhost:5001/StudentRegistationPage/Qualifications'); // Adjust the endpoint URL based on your backend setup
//         setQualifications(response.data);
//       } catch (error) {
//         console.error('Error fetching states:', error);
//       }
//     };

//     fetchQualifications();
//   }, []);
//   useEffect(() => {
//     const fetchState = async () => {
//       try {
//         const response = await axios.get('http://localhost:5001/StudentRegistationPage/states'); // Adjust the endpoint URL based on your backend setup
//         setStates(response.data);
//       } catch (error) {
//         console.error('Error fetching states:', error);
//       }
//     };

//     fetchState();
//   }, []);

//   const handleStateChange = async (event) => {
//     const state_id = event.target.value;
//     setSelectedState(state_id);

//     try {
//       const response = await axios.get(`http://localhost:5001/StudentRegistationPage/districts/${state_id}`);
//       setDistricts(response.data);
//       setSelecteddistrict('');
//     } catch (error) {
//       console.error('Error fetching districts:', error);
//     }
//   };

//   const handledistrictChange = (event) => {
//     const newDistrictId = event.target.value;
//     setSelecteddistrict(newDistrictId);
//   };

//   const handleBatchChange = (event) => {
//     const BatchId  = event.target.value;
//     setSelectedBatch(BatchId);
//   };
//   const handleQualificationChange = (event) => {
//     const edStatusId  = event.target.value;
//     setselectedQualification(edStatusId);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "gender") {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//       setSelectedGenderId(value);
//     } else if (name === "category") {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//       setSelectedCategoryId(value);
//     } else if (name === "state_id") {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//       setSelectedState(value);
//     } else if (name === "districts_id") {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//       setSelecteddistrict(value);
//     } else if (name === "BatchId") {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//       setSelectedBatch(value);
//     } else if (name === "edStatusId") {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//       setselectedQualification(value);
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   useEffect(() => {
  

//     fetchcourse();
//   }, [courseCreationId]);


//   const fetchcourse = async () => {
//     try {
//       const response = await fetch(`http://localhost:5001/StudentRegistationPage/coursedataSRP/${courseCreationId}`);
//       const data = await response.json();
//       setCourseData(data);
//     } catch (error) {
//       console.error('Error fetching course data:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Selected State:", selectedState);
//     console.log("Selected District:", selecteddistrict);

//     const contactNo = parseInt(formData.contactNo, 10);
//     if (isNaN(contactNo)) {
//       alert('Contact No must be a valid number');
//       return;
//     }
//     // Compare email and confirm email
//     if (formData.emailId !== formData.confirmEmailId) {
//       alert("Email and Confirm Email must match");
//       return;
//     }

//     const dataToSend = {
//       ...formData,
//       GenderId: selectedGenderId,
//       CategoryId: selectedCategoryId,
//       contactNo: contactNo,
//       state_id: selectedState,
//       districts_id:selecteddistrict,
//       BatchId:selectedBatch,
//       edStatusId:selectedQualification,
//     };

//     console.log("Data to send:", dataToSend); // Add this console log
//     const formDataToSend = new FormData();

//     // Append fields
//     Object.entries(dataToSend).forEach(([key, value]) => {
//       formDataToSend.append(key, value);
//     });
    
//     // Append files
//     Object.entries(fileState).forEach(([key, value]) => {
//       formDataToSend.append(key, value);
//     });
    
//     console.log("Data to send:", formDataToSend);

//     try {
//       const response = await fetch(
//         `http://localhost:5001/StudentRegistationPage/studentForm/${courseCreationId}`,
//         {
//           method: "POST",
//           headers: {
//             // "Content-Type": "application/json",
//             // 'Content-Type': 'multipart/form-data',
//           },
//           // body: JSON.stringify(dataToSend),
//           body: formDataToSend,
//         }
//       );

//       if (response.ok) {
//         console.log("Form submitted successfully");
//       } else {
//         const errorMessage = await response.text();
//         console.error("Failed to submit form");
//         alert("Failed to submit form: " + errorMessage);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Error submitting form. Please try again later.");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <section>
//           <h1>Student Registration Page</h1>
//           <div>
//             <label htmlFor="candidateName">CANDIDATE NAME(accoding to 10th memo):</label>
//             <input
//               type="text"
//               id="candidateName"
//               name="candidateName"
//               value={formData.candidateName}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="dateOfBirth">DATE OF BIRTH:</label>
//             <input
//               type="date"
//               id="dateOfBirth"
//               name="dateOfBirth"
//               value={formData.dateOfBirth}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div>
//             <label>GENDER:</label>
//             {genders.map((gender) => (
//               <div key={gender.GenderId}>
//                 <input
//                   type="radio"
//                   id={gender.GenderId}
//                   name="gender"
//                   value={gender.GenderId}
//                   checked={parseInt(selectedGenderId) === gender.GenderId}
//                   onChange={handleInputChange}
//                 />
//                 <label htmlFor={gender.GenderId}>{gender.Gander}</label>
//               </div>
//             ))}
//           </div>

//           {/* CATEGORY: */}
//           <div>
//             <label>CATEGORY:</label>
//             {categories.map((category) => (
//               <div key={category.CategoryId}>
//                 <input
//                   type="radio"
//                   id={category.CategoryId}
//                   name="category"
//                   value={category.CategoryId}
//                   checked={parseInt(selectedCategoryId) === category.CategoryId}
//                   onChange={handleInputChange}
//                 />
//                 <label htmlFor={category.CategoryId}>{category.Category}</label>
//               </div>
//             ))}
//           </div>
//           <div>
//             <label htmlFor="emailId">EMAIL ID:</label>
//             <input
//               type="email"
//               id="emailId"
//               name="emailId"
//               value={formData.emailId}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="confirmEmailId">CONFIRM EMAIL ID:</label>
//             <input
//               type="email"
//               id="confirmEmailId"
//               name="confirmEmailId"
//               value={formData.confirmEmailId}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="contactNo">CONTACT NO:</label>
//             <input
//               type="number"
//               id="contactNo"
//               name="contactNo"
//               value={formData.contactNo}
//               onChange={handleInputChange}
//             />
//           </div>
//         </section>
//         <section>
//           <h2>FATHER'S/GUARDIAN'S DETAILS</h2>
//           <div>
//             <label htmlFor="fatherName">FATHER'S NAME:</label>
//             <input
//               type="text"
//               id="fatherName"
//               name="fatherName"
//               value={formData.fatherName}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div>
//             <label htmlFor="occupation">OCCUPATION:</label>
//             <input
//               type="text"
//               id="occupation"
//               name="occupation"
//               value={formData.occupation}
//               onChange={handleInputChange}
//             />
//           </div>


//           <div>
//             <label htmlFor="mobileNo">MOBILE NO:</label>
//             <input
//               type="number"
//               id="mobileNo"
//               name="mobileNo"
//               value={formData.mobileNo}
//               onChange={handleInputChange}
//             />
//           </div>
//         </section>

//         <section>
//           <h2>COMMUNICATION ADDRESS</h2>
//           <div>
//             <label htmlFor="line1">LINE1:</label>
//             <input
//               type="text"
//               id="line1"
//               name="line1"
//               value={formData.line1}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="inputContent">
//           <h2>Select a State</h2>
//       <select onChange={handleStateChange} value={selectedState}>
//         <option value="" disabled>
//           Choose a state
//         </option>
//         {states.map((state) => (
//           <option key={state.state_id} value={state.state_id}>
//             {state.name}
//           </option>
//         ))}
//       </select>

//       </div>
//       <div >
// {selectedState && (
//         <div>
//           <h2>Select a District</h2>
//           <select onChange={handledistrictChange}  value={selecteddistrict} >
//             <option value="" disabled>
//               Choose a district
//             </option>
//             {districts.map((district) => (
//               <option key={district.districts_id } value={district.districts_id }>
//                 {district.districts_name}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}</div>

// <div>
//             <label htmlFor="pincode">PINCODE:</label>
//             <input
//               type="number"
//               id="pincode"
//               name="pincode"
//               value={formData.pincode}
//               onChange={handleInputChange}
//             />
//           </div>

//         </section>
//         <h2>COURSE DETAILS</h2>
//         <div className="inputContent">
//           {courseData.map((course) => (
//             <div key={course.courseCreationId}>
//               <p>EXAM: {course.examName}</p>
//               <p>SESSION: {course.courseYear}</p>
//               <p>COURSE: {course.courseName}</p>
//               <p>SUBJECTS :{course.subjects.join(', ')}</p>
//             </div>
//           ))}
//           </div>
//         <section>

//         <h2>BATCH</h2>
//       <select onChange={handleBatchChange} value={selectedBatch}>
//         <option value="" disabled>
//           Choose a Batch
//         </option>
//         {Batchs.map((Batch) => (
//           <option key={Batch.BatchId } value={Batch.BatchId }>
//             {Batch.Batch}
//           </option>
//         ))}
//       </select> 
//         </section>
// <section>
//   <h1>EDUCATION DETAILS</h1>

// <h2>QUALIFICATION</h2>
// <select onChange={handleQualificationChange} value={selectedQualification}>
// <option value="" disabled>
//   Choose a Qualification
// </option>
// {Qualifications.map((Qualification) => (
//   <option key={Qualification.edStatusId  } value={Qualification.edStatusId  }>
//     {Qualification.educationStatus}
//   </option>
// ))}
// </select> 

// <div>
//             <label htmlFor="NameOfCollege">NAME OF COLLEGE (WITH CITY):</label>
//             <input
//               type="text"
//               id="NameOfCollege"
//               name="NameOfCollege"
//               value={formData.NameOfCollege}
//               onChange={handleInputChange}
//             />
//           </div>
          
// <div>
//             <label htmlFor="passingYear">PASSING YEAR:</label>
//             <input
//               type="text"
//               id="passingYear"
//               name="passingYear"
//               value={formData.passingYear}
//               onChange={handleInputChange}
//             />
//           </div>


//           <div>
//             <label htmlFor="marks">MARKS IN %:</label>
//             <input
//               type="text"
//               id="marks"
//               name="marks"
//               value={formData.marks}
//               onChange={handleInputChange}
//             />
//           </div>

// </section>
// <div className="content_reg ">

// {/* UPLOAD PHOTO  -----------*/}
//            <div className="imgSection">
//              <h3>UPLOAD PHOTO <span>*</span> </h3>
//              <img src={noimg} width={144} height={144} alt="asaS" />
//              <div className="input-filde">
//                <input
//                required
//                  type="file"
//                  name="files1"
//                  onChange={handleFileChange}
//                />
//                {/* <span className="errorText">{formErrors.files1}</span> */}
//              </div>
//            </div>
// {/* >UPLOAD SIGNATURE   -----------*/}
//            <div className="imgSection">
//              <h3>UPLOAD SIGNATURE  <span>*</span> </h3>
//              <img src={noimg} width={144} height={144} alt="asaS" />
//              <div className="input-filde">
//                <input
//                  type="file"
//                  name="filess"
//                  onChange={handleFileChange}
//                />
//                {/* <span className="errorText">{formErrors.filess}</span> */}
//              </div>
//            </div>
// {/* UPLOAD ID PROOF   -----------*/}
//            <div className="imgSection">
//              <h3>UPLOAD ID PROOF  <span>*</span> </h3>
//              <img src={noimg} width={144} height={144} alt="asaS" />
//              <div className="input-filde">
//                <input
//                  type="file"
//                  name="filess3"
//                  onChange={handleFileChange}
//                />
//                {/* <span className="errorText">{formErrors.filess3}</span> */}
//              </div>
//            </div>

          
//          </div>
// <section>


// </section>
//         <div>
//           <button type="submit">Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default StudentRegistrationPage;


import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import noimg from "./NoImages.jpg";

const DisplayFormData = ({ formData,getGenderName, onSubmit, onBack }) => {
  console.log(formData)
  return (
    <div>
      {/* Display the entered data */}
      <h1>Entered Data</h1>
    <div>
      <p>Candidate Name: {formData.candidateName}</p>
      <p>Date of Birth: {formData.dateOfBirth}</p>
      <p>Gender: {getGenderName(formData.GenderId)}</p>
    </div>

      {/* Buttons to submit or go back */}
      <button onClick={onSubmit}>Pay Now</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
};



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
    const handleFileChange = (e) => {
      const { name, files } = e.target;
      setFileState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    };
    const [fileState, setFileState] = useState({
      files1: "",
      filess: "",
      filess3: "",
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
          const fetchQualifications = async () => {
            try {
              const response = await axios.get('http://localhost:5001/StudentRegistationPage/Qualifications'); // Adjust the endpoint URL based on your backend setup
              setQualifications(response.data);
            } catch (error) {
              console.error('Error fetching states:', error);
            }
          };
      
          fetchQualifications();
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
        const handleQualificationChange = (event) => {
          const edStatusId  = event.target.value;
          setselectedQualification(edStatusId);
        };
        const handleInputChange = (e) => {
  const { name, value } = e.target;

  if (name === "gender") {
    console.log("Selected Gender:", value);
    setSelectedGenderId(value);
  } else if (name === "category") {
    console.log("Selected Category:", value);
    setSelectedCategoryId(value);
  } else if (name === "state_id") {
    console.log("Selected State:", value);
    setSelectedState(value);
  } else if (name === "districts_id") {
    console.log("Selected District:", value);
    setSelecteddistrict(value);
  } else if (name === "BatchId") {
    console.log("Selected Batch:", value);
    setSelectedBatch(value);
  } else if (name === "edStatusId") {
    console.log("Selected Qualification:", value);
    setselectedQualification(value);
  }

  // Always update the formData with the new value
  setFormData({
    ...formData,
    [name]: value,
  });
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
      

        const handleDisplayData = (e) => {
          e.preventDefault();
          setDisplayFormData(formData);
        };
        
        

  const handleBack = () => {
    // Clear the displayed data and go back to the form
    setDisplayFormData(null);
  };

  const handleFormSubmit = async (e) => {
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
      districts_id: selecteddistrict,
      BatchId: selectedBatch,
      edStatusId: selectedQualification,
    };
    console.log("Data to send:", dataToSend); // Add this console log
    const formDataToSend = new FormData();

    // Append fields
    Object.entries(dataToSend).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    
    // Append files
    Object.entries(fileState).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    
    const displayData = {
      ...formData,
      Gander: getGenderName(selectedGenderId),
      category: getCategoryName(selectedCategoryId),
      state_id: getStateName(selectedState),
      districts_id: getDistrictName(selecteddistrict),
    };
    setDisplayFormData(displayData);
    console.log("Data to send:", formDataToSend);
    try {
      const response = await fetch(
                `http://localhost:5001/StudentRegistationPage/studentForm/${courseCreationId}`,
                {
                  method: "POST",
                  headers: {
                    // "Content-Type": "application/json",
                    // 'Content-Type': 'multipart/form-data',
                  },
                  // body: JSON.stringify(dataToSend),
                  body: formDataToSend,
                }
                );
                if (response.ok) {
                          console.log("Form submitted successfully");
                        } else {
                          const errorMessage = await response.text();
                          console.error("Failed to submit form");
                          alert("Failed to submit form: " + errorMessage);
                        }
      // After successfully saving to the database, you may want to clear the form
      setFormData({
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
    } catch (error) {
      console.error("Error saving form data:", error);
      alert("Failed to submit form. Please try again later.");
    }
  };

  const getGenderName = (GenderId) => {
    const Gander = genders.find((g) => g.GenderId === parseInt(GenderId));
    return Gander ? Gander.Gander : "";
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

  if (displayFormData) {
    return (
      <DisplayFormData
        formData={displayFormData}
        getGenderName={getGenderName}
        onSubmit={handleFormSubmit}
        onBack={handleBack}
      />
    );
  }

  return (
    <div>
     <form onSubmit={handleFormSubmit}>

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
<section>
  <h1>EDUCATION DETAILS</h1>

<h2>QUALIFICATION</h2>
<select onChange={handleQualificationChange} value={selectedQualification}>
<option value="" disabled>
  Choose a Qualification
</option>
{Qualifications.map((Qualification) => (
  <option key={Qualification.edStatusId  } value={Qualification.edStatusId  }>
    {Qualification.educationStatus}
  </option>
))}
</select> 

<div>
            <label htmlFor="NameOfCollege">NAME OF COLLEGE (WITH CITY):</label>
            <input
              type="text"
              id="NameOfCollege"
              name="NameOfCollege"
              value={formData.NameOfCollege}
              onChange={handleInputChange}
            />
          </div>
          
<div>
            <label htmlFor="passingYear">PASSING YEAR:</label>
            <input
              type="text"
              id="passingYear"
              name="passingYear"
              value={formData.passingYear}
              onChange={handleInputChange}
            />
          </div>


          <div>
            <label htmlFor="marks">MARKS IN %:</label>
            <input
              type="text"
              id="marks"
              name="marks"
              value={formData.marks}
              onChange={handleInputChange}
            />
          </div>

</section>
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
               {/* <span className="errorText">{formErrors.files1}</span> */}
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
               {/* <span className="errorText">{formErrors.filess}</span> */}
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
               {/* <span className="errorText">{formErrors.filess3}</span> */}
             </div>
           </div> 
         </div>
<section>
</section>
        <div>
          <button type="button" onClick={handleDisplayData}>
            Submit
          </button>
        </div>
      </form>
      {displayFormData && (
        <DisplayFormData
          formData={displayFormData}
          getGenderName={getGenderName}
          onSubmit={handleFormSubmit}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default StudentRegistrationPage;