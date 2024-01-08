import React from 'react'
import { Link } from "react-router-dom";
const StdLeftNav = () => {
  return (
    <div>
        <ul className="left-nav-bar-ul">
            <li><Link  className="LeftnavLinks"><i class="fa-solid fa-industry"></i><p>Dashboard</p></Link></li>
            <li><Link className="LeftnavLinks"><i class="fa-solid fa-graduation-cap"></i>My Courses</Link></li>
            <li><Link className="LeftnavLinks"><i class="fa-solid fa-sack-dollar"></i>Buy Courses</Link> </li>
            <li><Link className="LeftnavLinks"><i class="fa-solid fa-square-poll-vertical"></i>My Result</Link></li>
            <li><Link className="LeftnavLinks"><i class="fa-solid fa-comments"></i>Message </Link></li>
            <li><Link className="LeftnavLinks"><i class="fa-regular fa-file-lines"></i>Documents</Link></li>
            <li><Link className="LeftnavLinks"><i class="fa-solid fa-newspaper"></i>Newa & Updates</Link></li>
            <li><Link className="LeftnavLinks"><i class="fa-solid fa-bookmark"></i>Bookmarked Questions</Link></li>
            <li><Link className="LeftnavLinks"><i class="fa-solid fa-gears"></i>Settings</Link></li>
        </ul>
    </div>
  )
}

export default StdLeftNav