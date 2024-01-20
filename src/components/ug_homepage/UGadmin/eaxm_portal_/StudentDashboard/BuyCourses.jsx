import React, { useEffect, useState } from 'react';

const BuyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [userData, setUserData] = useState({});
  const [showAddedCourses, setShowAddedCourses] = useState(false);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5001/BuyCourses/DisplayCoursesForBuy');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);  

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            "http://localhost:5001/ughomepage_banner_login/user",
            {
              headers: {
                Authorization: `Bearer ${token}`, // Attach token to headers for authentication
              },
            }
          );
  
          if (response.ok) {
            const userData = await response.json();
            setUserData(userData);
            console.log(userData);
          } else {
            // Handle errors, e.g., if user data fetch fails
          }
        } catch (error) {
          // Handle other errors
        }
      };
  
      fetchUserData();
    }, []);


    const handleBuyClick = async (courseCreationId) => {
        try {
          const response = await fetch('http://localhost:5001/BuyCourses/buyCourses', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: userData.id,
              courseCreationId: courseCreationId,
            }),
          });
    
          if (response.ok) {
            console.log('Buy successful');
            // Update the userCourses state if needed
            setUserCourses([...userCourses, { user_id: userData.id, course_id: courseCreationId }]);
          } else {
            console.error('Failed to make a purchase');
          }
        } catch (error) {
          console.error('Error making a purchase:', error);
        }
      };

  const handleAddToCartClick = async (courseCreationId) => {
    // Check if the course is already in the cart
    const isCourseInCart = userCourses.some((userCourse) => userCourse.course_id === courseCreationId && userCourse.status === 'cart');
  
    if (isCourseInCart) {
      console.log(`Course ID ${courseCreationId} is already in the user's cart`);
    } else {
      // Implement logic for handling the "Add to Cart" button click
      console.log(`Add to Cart clicked for course ID ${courseCreationId}`);
      
      try {
        const response = await fetch('http://localhost:5001/BuyCourses/addToCart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userData.id, 
            courseCreationId: courseCreationId,  
          }),
        });
  
        if (response.ok) {
          console.log('Added to cart successfully');
          // Update the userCourses state to reflect the change
          setUserCourses([...userCourses, { user_id:  userData.id, course_id: courseCreationId, status: 'cart' }]);
        } else {
          console.error('Failed to add to cart');
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  };

  const handleViewAddedCoursesClick = async () => {
    setShowAddedCourses(!showAddedCourses); // Toggle visibility
    if (showAddedCourses) {
      return; // If it's being closed, no need to fetch data
    }

    try {
      const response = await fetch(`http://localhost:5001/BuyCourses/addedCourses/${userData.id}`);
      if (response.ok) {
        const { courses } = await response.json();
        console.log('Fetched added courses:', courses);
        // Update the userCourses state with the fetched courses
        setUserCourses(courses);
      } else {
        console.error('Failed to fetch added courses');
      }
    } catch (error) {
      console.error('Error fetching added courses:', error);
    }
  };

  const handleDeleteFromCartClick = async (courseCreationId) => {
    try {
      const response = await fetch('http://localhost:5001/BuyCourses/deleteFromCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData.id,
          course_id: courseCreationId,
        }),
      
      });
      fetchData();
      if (response.ok) {
        console.log('Deleted from cart successfully');
        // Implement logic to update the UI or state if needed
      } else {
        console.error('Failed to delete from cart');
      }
    } catch (error) {
      console.error('Error deleting from cart:', error);
    }
    
  };

  return (
    <div>
      <h1>Buy Courses</h1>
      <button onClick={handleViewAddedCoursesClick}>{showAddedCourses ?  <i class="fa-solid fa-cart-shopping"></i> : <i class="fa-solid fa-cart-shopping"></i>}</button>
      {showAddedCourses && (
      <div>
      {userCourses.map((userCourse) => (
        <div key={userCourse.courseCreationId}>
          <p>{userCourse.courseCreationId}</p>
          <p>{userCourse.courseName}</p>
          <p>{userCourse.courseYear}</p>
          <p>{userCourse.courseStartDate}</p>
          <p>{userCourse.courseEndDate}</p>
          <p>{userCourse.cost}</p>
          <p>{userCourse.Discount}</p>
          <p>{userCourse.totalPrice}</p>
          <button onClick={() => handleBuyClick(userCourse.courseCreationId)}>Buy Now</button>
          <button onClick={() => handleDeleteFromCartClick(userCourse.courseCreationId)}>Delete from Cart</button>
        </div>
      ))} 
      </div>
      )}
      {courses.map((course) => (
        <div key={course.courseCreationId}>
          <p>{course.courseCreationId}</p>
          <p>{course.courseName}</p>
          <p>{course.courseYear}</p>
          <p>{course.courseStartDate}</p>
          <p>{course.courseEndDate}</p>
          <p>{course.cost}</p>
          <p>{course.Discount}</p>
          <p>{course.totalPrice}</p>
          <button onClick={() => handleBuyClick(course.courseCreationId)}>Buy Now</button>
          <button onClick={() => handleAddToCartClick(course.courseCreationId)}>Add to Cart</button>
        </div>
      ))}


       
    </div>
  );
};

export default BuyCourses;
