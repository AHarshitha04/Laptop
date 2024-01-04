
import React from 'react'
import { useParams, useNavigate } from "react-router-dom";



const TestResultsPage = () => {

  //   // Explicitly use the useLocation hook
  // const location = useLocation();

  //     // Check if location is defined and has a state property
  // if (!location || !location.state) {
  //   // Handle the case where location or location.state is undefined
  //   return <div>Error: Missing location or location.state</div>;
  // }

      // Access counts from location state
  // const {
  //   answeredCount,
  //   notAnsweredCount,
  //   markedForReviewCount,
  //   answeredmarkedForReviewCount,
  //   VisitedCount,
  // } = location.state;

  // const totalQuestions =
  // answeredCount +
  // notAnsweredCount +
  // markedForReviewCount +
  // answeredmarkedForReviewCount +
  // VisitedCount;

  
    return (
      <div>
        <div>
          <h1>Your Test Performance</h1>
          <p>Your Score</p>
          <p>Attempted Questions</p>
          <p>Correct</p>
          <p>Top Score</p>
          <p>Live Rank</p>
        </div>
      </div>
    );
  };
  
  export default TestResultsPage;