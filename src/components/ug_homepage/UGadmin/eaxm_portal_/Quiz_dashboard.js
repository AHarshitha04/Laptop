import React, { useState, useEffect } from "react";
import Adimheader from "../login/Adimheader";
import { nav } from "./DATA/Data";
import { Link } from "react-router-dom";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

import Exam_portal_admin_integration from "../../exam_portal_admin/Exam_portal_admin_integration"
import UG_HOME from "../../UG_HOME";
import "./Quiz_amain_page.css"

const Quiz_dashboard = () => {
  const [showQuizmobilemenu, setShowQuizmobilemenu] = useState(false);
  const QuiZ_menu = () => {
    setShowQuizmobilemenu(!showQuizmobilemenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    window.location.href = "/uglogin";
  };
  

  return (
    <div>
      
      <div className="Quiz_main_page_header">
        {nav.map((nav, index) => {
          return (
            <div key={index} className="Quiz_main_page_navbar">
              <div className="Quizzlogo">
                <img src={nav.logo} alt="" />
              </div>
              {/* <li  className={showcardactive1?"showcardactive":"showcardactivenone"}> */}

              <div
                className={
                  !showQuizmobilemenu
                    ? "Quiz_main_page_navbar_SUBpart Quiz_main_page_navbar_SUBpart_mobile"
                    : "Quiz_main_page_navbar_SUBpart_mobile"
                }
              >
                <ul>
                  <button style={{ background: "none" }}>
                    <Link to="/Exam_portal_home_page" className="Quiz__home">
                      Home
                    </Link>
                  </button>

                  {/* <button className="quiz_sign_UP">                   
                    Sign up
                  </button> */}
                  <div className="Quiz_main_page_login_signUp_btn">
                    {/* 
                      <Link to='/'><button onClick={Quiz_login}>
                   Login
                  </button></Link> */}
                  </div>
                  <div>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                </ul>
              </div>

              <div className="quz_menu" onClick={QuiZ_menu}>
                <div className="lines"></div>
                <div className="lines"></div>
                <div className="lines"></div>
              </div>
            </div>
          );
        })}
      </div>

      <Quiz_main_page_container />
    </div>
  );
};

export default Quiz_dashboard;

export const Quiz_main_page_container = () => {
  const [showcardactive2, setshowcardactive2] = useState(true);
  const [showcardactive1, setshowcardactive1] = useState(false);
const [showcard1, setshowcard1] = useState(true);
const [showcard2, setshowcard2] = useState(false);

  const UG_HOMEadim_btn = () => {
    setshowcardactive2(true);
    setshowcardactive1(false);
    setshowcard1(true)
console.log("hello");
    setshowcard2(false)

  };

  const UG_HOMEQuiz_btn = () => {
    setshowcardactive2(false);
    setshowcardactive1(true);
    setshowcard1(false)
    setshowcard2(true)

  };
  const userRole = localStorage.getItem('userRole');
  return (
    <>
      <div className="Quiz_main_page_container">
        <div className="Quiz_main_page_container_btns">

        {/* {(userRole === 'admin' || userRole === 'ugadmin') && ( */}
{userRole === 'admin'  && (
      
          <button
            className={
              showcardactive2 ? "showcardactive" : "showcardactivenone"
            }
            onClick={UG_HOMEadim_btn}
          >
            UG Page Admin
          </button>
   )}
{userRole === 'admin'  && (

// {(userRole === 'admin' || userRole === 'ugotsadmin') && (
  <button
    className={showcardactive1 ? "showcardactive" : "showcardactivenone"}
    onClick={UG_HOMEQuiz_btn}
  >
    UG Quiz Admin
  </button>
)}
        </div>


 {/* {(userRole === 'admin' || userRole === 'ugadmin') && ( */}
{userRole === 'admin'  && (

 <>
 
  {showcard1 ? (
          <div className="UGhomepageadmin">
          <UploadPage />
        </div>


) : null}

 </>)}
        
       

       
 {/* {(userRole === 'admin' || userRole === 'ugotsadmin') && ( */}

{userRole === 'admin'  && (

  <>
    
    {showcard2 ? (
          <div className="UGQUizadmin">
         
        <Exam_portal_admin_integration/>

        </div>


) : null}
  
  </>
 )}
   

{userRole === 'ugadmin'  && (
  <>
    <UploadPage />
  </>
)}

{userRole === 'ugotsadmin'  && (
  <>
    <Exam_portal_admin_integration />
  </>
)}
</div>
    </>
  );
};

//------------------- ug adminpage-----------------------------

export const UploadPage = () => {
  // const[showselectexamsection,Setshowselectexamsection]=useState(true)
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([""]);
  const [sections, setSections] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedSection, setSelectedSection] = useState("");

  const [enableExamsMenu, setEnableExamsMenu] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5001/ughomepage_banner_login/UGhomepageadimcourses")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const fetchExamsAndSections = (courseId) => {
    axios
      .get(`http://localhost:5001/ughomepage_banner_login/UGhomepageadimsections/${courseId}`)
      .then((res) => {
        setSections(res.data);
        console.log(sections);
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });
  };

  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    setSelectedCourse(courseId);
    setSelectedSection(null);
    setSelectedExam(null);
    setEnableExamsMenu(false);
    fetchExamsAndSections(courseId);
    console.log("Selected Course:", courseId);
  };
  const [show1, setShow1] = useState(null);
  const handleSectionChange = (event) => {
    const sectionId = event.target.value;
    setSelectedSection(sectionId);

    // Enable the "Exams" menu only for specific section values
    const isFirstSection = sectionId === "1";
    const isSecondSection = sectionId === "2";
    const isThirdSection = sectionId === "3";
    const isFourthSection = sectionId === "4";
    const isFiveSection = sectionId === "5";
    const isSixthSection = sectionId === "6";

    // Enable/disable exams menu based on the condition

    setEnableExamsMenu(isThirdSection || isSixthSection);

    if (isThirdSection || isSixthSection) {
      setShow1(true);
    } else {
      setShow1(false);
    }

    if (isFirstSection || isSecondSection || isFourthSection || isFiveSection) {
      const fetchExamsAndSections = (courseId) => {
        axios
          .get(`http://localhost:5001/ughomepage_banner_login/UGhomepageadimsections/${courseId}`)
          .then((res) => {
            setSections(res.data);
            console.log("Selected section:", sectionId);
            // console.log(sections);
          })
          .catch((error) => {
            console.error("Error fetching sections:", error);
          });
        axios
          .get(`http://localhost:5001/ughomepage_banner_login/UGhomepageadimexams/${courseId}`)
          .then((res) => {
            // setExams(res.data);
            console.log(exams);
          })
          .catch((error) => {
            console.error("Error fetching exams:", error);
          });
        fetchExamsAndSections(selectedCourse);
      };
    } else if (isThirdSection || isSixthSection) {
      // Fetch exams based on the selected course and section

      const fetchExamsAndSections = (courseId) => {
        axios
          .get(`http://localhost:5001/ughomepage_banner_login/UGhomepageadimsections/${courseId}`)
          .then((res) => {
            setSections(res.data);
            console.log(sections);
          })
          .catch((error) => {
            console.error("Error fetching sections:", error);
          });

        axios
          .get(`http://localhost:5001/ughomepage_banner_login/UGhomepageadimexams/${courseId}`)
          .then((res) => {
            setExams(res.data);

            console.log(exams);
          })
          .catch((error) => {
            console.error("Error fetching exams:", error);
          });
      };
      fetchExamsAndSections(selectedCourse);
      setExams([]);
      setSections([]);
    }

    if (
      setExams == isFirstSection ||
      isSecondSection ||
      isFourthSection ||
      isFiveSection
    ) {
      setSelectedExam(!exams);

      const fetchExamsAndSections = (courseId) => {
        axios
          .get(`http://localhost:5001/ughomepage_banner_login/UGhomepageadimsections/${courseId}`)
          .then((res) => {
            setSections(res.data);
            console.log(sections);
          })
          .catch((error) => {
            console.error("Error fetching sections:", error);
          });

        axios
          .get(`http://localhost:5001/ughomepage_banner_login/UGhomepageadimexams/${courseId}`)
          .then((res) => {
            // setExams(res.data);

            console.log(exams);
          })
          .catch((error) => {
            console.error("Error fetching exams:", error);
          });
      };
      fetchExamsAndSections(selectedCourse);
      setExams([]);
      setSections([]);
      // Setshowselectexamsection(false)
      console.log("working");
    } else if (
      setExams == isSecondSection ||
      isFirstSection ||
      isFourthSection ||
      isFiveSection
    ) {
      setSelectedExam(!exams);

      const fetchExamsAndSections = (courseId) => {
        axios
          .get(`http://localhost:5001/ughomepage_banner_login/UGhomepageadimsections/${courseId}`)
          .then((res) => {
            setSections(res.data);
            console.log(sections);
          })
          .catch((error) => {
            console.error("Error fetching sections:", error);
          });
        axios
          .get(`http://localhost:5001/ughomepage_banner_login/UGhomepageadimexams/${courseId}`)
          .then((res) => {
            // setExams(res.data);

            console.log(exams);
          })
          .catch((error) => {
            console.error("Error fetching exams:", error);
          });
      };
      fetchExamsAndSections(selectedCourse);
      setExams([]);
      setSections([]);
      // console.log("working")
    }
  };

  const handleExamChange = (event) => {
    const examId = event.target.value;
    setSelectedExam(examId);
  };

  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpload = async () => {
    if (!selectedCourse || !selectedSection || !image) {
      setUploadStatus("error")
      console.error(
        "Please select course, section, and choose an image before uploading."
      );
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("course_id", selectedCourse);
    formData.append("section_id", selectedSection);

    try {
      // Include exam_id in the formData if selectedSection is "3" or "6"
      if (["3", "6"].includes(selectedSection)) {
        if (!selectedExam) {
          console.error("Please select an exam for Course Exam Page.");
          return;
        }
        formData.append("exam_id", selectedExam);
      }

      // Use a single route for both main page and course exam uploads
      const response = await axios.post(
        "http://localhost:5001/ughomepage_banner_login/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // "Authorization": "Bearer YOUR_ACCESS_TOKEN",
          },
        }
      );

      console.log(response.data);
      setUploadStatus("success");
      // Update UI or perform other actions on successful upload
    } catch (error) {
      console.error("Error uploading image", error);
      setUploadStatus("error");
      // Handle error, show a message, etc.
    }
  };

  return (
    <div className="Quiz_admin_page_container">

<div>
        {uploadStatus === "success" && (
          <p style={{ color: "green", fontSize:"20px"}}>Successfully uploaded!</p>
        )}
        {uploadStatus === "error" && (
          <p style={{ color: "red", fontSize:"20px"}}>
            Error uploading image. Please try again.
          </p>
        )}
      </div>
      <div>
        <h3>Upload Images</h3>
      </div>

      <div className="UGhomepageadmin_inputs">
        <label htmlFor="Course">Course: </label>
        <select
          id="CourseChange"
          onChange={handleCourseChange}
          value={selectedCourse}
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.course_id} value={course.course_id}>
              {course.course_name}
            </option>
          ))}
        </select>
      </div>

      <div className="UGhomepageadmin_inputs">
        <label htmlFor="Section">Section: </label>
        <select
          id="SectionChange"
          onChange={handleSectionChange}
          value={selectedSection}
        >
          <option value="">Select Section</option>
          {sections.map((section) => (
            <option key={section.section_id} value={section.section_id}>
              {section.section_name}
            </option>
          ))}
        </select>
       

 
      </div>

      <div>
      {show1 ? (
            <div className="UGhomepageadmin_inputs">
            <label htmlFor="state">Exam: </label>
            <select id="state" onChange={handleExamChange} value={selectedExam}>
              <option value="">Select Exam</option>
              {exams.map((exam) => (
                <option key={exam.exam_id} value={exam.exam_id}>
                  {exam.exam_name}
                </option>
              ))}
            </select>
            <br />
          </div>
        ) : null}
      </div>


      <div>
      <input type="file" onChange={handleFileChange} />
      </div>
      <div>
      <button onClick={handleUpload}>Upload Image</button>    




  <Link 
        to={"/ImageFetching"}
      >
        Show Uploaded Files
      </Link>
  
</div>
   
    </div>
  );
};

export const ImageFetching = () => {
  const [imageTitle, setImageTitle] = useState([]);
 
  useEffect(() => {
    axios
      .get("http://localhost:5001/ughomepage_banner_login/ImageTitle")
      .then((res) => {
        setImageTitle(res.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);
 
 
  const [imageArray, setImageArray] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5001/ughomepage_banner_login/HomeImagesadmin")
      .then((res) => {
        setImageArray(res.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);
 
 
  const handleDeleteImage = (imageId) => {
    axios
      .delete(`http://localhost:5001/ughomepage_banner_login/HomeImages/${imageId}`)
      .then(() => {
        // Remove the deleted image from the local state
        setImageArray((prevImages) =>
          prevImages.filter((image) => image.id !== imageId)
        );
        // window.alert('Image deleted successfully!');
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  };
  
  // const [updateData, setUpdateData] = useState({
  //   id: null,
  //   imageTitle: "",
  // });
 
  // const handleUpdate = (imageId) => {
  //   // Find the image data for the selected imageId
  //   const selectedImage = imageTitle.find(
  //     (image) => image.image_id === imageId
  //   );
 
  //   // Set the initial values in the update form
  //   setUpdateData({
  //     id: selectedImage.image_id,
  //     imageTitle: selectedImage.image_title,
  //   });
  // };
  return (
    <div className="UGhomepageadmin_Uploaded_Files">
      <div className="UGhomepageadmin_Uploaded_Files_header">
      <h1>Images</h1>
<Link to='/Quiz_dashboard'>Back</Link>

      </div>
   
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Images</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {imageTitle.map((imageName, index) => (
            <tr key={imageName.images_id}>
              <td>{index + 1}</td>
              <td>{imageName.image_title}</td>
              <td className="action">
                <Tooltip title="Delete" arrow>
                  <Button onClick={() => handleDeleteImage(imageName.images_id)}>
                    <span className="material-symbols-outlined">delete</span>{" "}
                  </Button>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {imageArray.length > 0 ? (
        <div className="UGhomepageadmin_Uploaded_Files_img_container__">
          {imageArray.map((image) => (
            <div className=".UGhomepageadmin_Uploaded_Files_img_container">
                <img
              key={image.id}
              src={image.imageData}
              alt={`Image ${image.id}`}
              className="UGhomepageadmin_Uploaded_Files_img_container_img"
              // style={{ maxWidth: "100px", marginBottom: "10px" }}
            />
            </div>
          
          ))}
        </div>
      ) : (
        <p>No images found.</p>
      )}
    </div>
  );
};
