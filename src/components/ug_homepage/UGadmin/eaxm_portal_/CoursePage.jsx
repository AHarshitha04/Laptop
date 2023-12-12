



import React, { useEffect, useState } from "react";
import axios from "axios";
import MockTest from "../../../../Images/mock_test.jpg";
import { Link, useParams } from "react-router-dom";

const CoursePage = () => {
  const { examId } = useParams();
  const [courseCard, setCourseCard] = useState([]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/feachingcourse/${examId}`);
        setCourseCard(response.data);
        console.log(examId)
        console.log("API Response:", response.data); // Log the API response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCourseDetails();
  }, [examId]);

  console.log("Exam ID:", examId); // Log the examId
  console.log("Course Card State:", courseCard); // Log the courseCard state

  return (
    <div>
      <h1>Current Courses</h1>
      <ul className="card_container_ul">
        {courseCard.map((courseDetails) => (
          <div key={courseDetails.courseCreationId} className="card_container_li">
            <img src={MockTest} alt="card" width={350} />
            <li><h3>{courseDetails.courseName}</h3></li>
            <li>
              Validity: ({courseDetails.courseStartDate}) to ({courseDetails.courseEndDate})
            </li>
            <li>Cost: {courseDetails.cost}</li>
            <li>Discount: {courseDetails.Discount}%</li>
            <li>Price after discount: {courseDetails.totalPrice}</li>
            
            <br />
            <div className="start_now">
              <Link to={`/Test_List/${courseDetails.courseCreationId}`}>Test Page</Link>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CoursePage;
