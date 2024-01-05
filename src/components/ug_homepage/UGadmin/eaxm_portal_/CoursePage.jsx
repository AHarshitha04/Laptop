



import React, { useEffect, useState } from "react";
import axios from "axios";
import MockTest from "../../../../Images/mock_test.jpg";
import { Link, useParams } from "react-router-dom";

const CoursePage = () => {
  const { examId } = useParams();
  const [courseCard, setCourseCard] = useState([]);
  const [noOfTests, setNoOfTests] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/Cards/feachingcourse/${examId}`);
        setCourseCard(response.data);
        console.log(examId)
        console.log("API Response:", response.data); // Log the API response
        const courseResponse = await fetch(
          "http://localhost:5001/Cards/Test/count"
        );
        if (!courseResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const courseData = await courseResponse.json();
        setNoOfTests(courseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [examId]);

  const currentDate = new Date(); // Get the current date

  // Filter exams based on start and end dates
  const filteredCourses = courseCard.filter(
    (courseDetails) =>
      new Date(courseDetails.courseStartDate) <= currentDate && currentDate <= new Date(courseDetails.courseEndDate)
  );

  console.log("Exam ID:", examId); // Log the examId
  console.log("Course Card State:", courseCard); // Log the courseCard state

  return (
    <div>
      <h1>Current Courses</h1>
      <ul className="card_container_ul">
      {filteredCourses.map((courseDetails) => (
          <div key={courseDetails.courseCreationId} className="card_container_li">
            <img src={MockTest} alt="card" width={350} />
            <li><h3>{courseDetails.courseName}</h3></li>
            <li>
              Validity: ({courseDetails.courseStartDate}) to ({courseDetails.courseEndDate})
            </li>
            <li>Cost: {courseDetails.cost}</li>
            {/* <li>Discount: {courseDetails.Discount}%</li> */}
            {/* <li>Price after discount: {courseDetails.totalPrice}</li> */}
            <li>
              
                            {noOfTests.map(
                              (count) =>
                                count.courseCreationId === courseDetails.courseCreationId && (
                                  <p key={count.courseCreationId}>
                                    No of Tests: {count.numberOfTests}
                                  </p>
                                )
                            )}
                          </li>
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
