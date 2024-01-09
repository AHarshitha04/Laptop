import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import './StudentDashbord.css';
const Student_dashboard = () => {

  const [userData, setUserData] = useState({});
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

  console.log(userData.profile_image);
  return (
    <div>
   
<ul className='std-ul'>
<div className='student_DB_Details'>
     <img src={userData.imageData} alt={userData.sername} />
     <p>{userData.username}</p>
     </div>
            <li className='std-li'><Link><i class="fa-solid fa-industry"></i>Dashboard</Link></li>
            <li className='std-li'><Link><i class="fa-solid fa-graduation-cap"></i>My Courses</Link></li>
            <li className='std-li'><Link><i class="fa-solid fa-sack-dollar"></i>Buy Courses</Link> </li>
            <li className='std-li'><Link ><i class="fa-solid fa-square-poll-vertical"></i>My Reslit</Link></li>
            <li className='std-li'><Link><i class="fa-solid fa-comments"></i>Message </Link></li>
            <li className='std-li'><Link ><i class="fa-regliar fa-file-lines"></i>Documents</Link></li>
            <li className='std-li'><Link><i class="fa-solid fa-newspaper"></i>Newa & Updates</Link></li>
            <li className='std-li'><Link><i class="fa-solid fa-bookmark"></i>Bookmarked Questions</Link></li>
            <li className='std-li'><Link to="/Student_Settings" ><i class="fa-solid fa-gears"></i>Settings</Link></li>
        </ul>

    </div>
  )
}

export default Student_dashboard