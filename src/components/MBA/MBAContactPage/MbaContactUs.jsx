import React from 'react'
import './MbaContactUs.css'

const MbaContactUs = () => {
  return (
    <div className='mba_contact_bg' id='contactt'>
        {/* This perticular div was responsible with all the content in MBA contact us page */}
     <div className='mba_Container mba_contacttUs'>
         <h1>CONTACT US</h1>
         {/* This perticular div was responsible with all the content in MBA contact us page except heading tag  */}
        <div className="mba_Countact-contant">
            {/* This perticular div was reponsible with the map which is implemented in the MBA contact us page */}
            <div className="mba_map">
                {/* To implement the map in MBA contact us page we are using iframe tag */}
            <iframe class="text1"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15229.163610218158!2d78.5120985!3d17.3978217!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9994cb7e0b83%3A0x4090f289cc85203c!2seGATE%20Tutor%20Academy!5e0!3m2!1sen!2sin!4v1688728318933!5m2!1sen!2sin"
               allowfullscreen="" loading="lazy"
               referrerpolicy="no-referrer-when-downgrade">
            </iframe>
            </div>
            {/* Here we are using this div to mention the address of our office so that we are used list tag to mention the address */}
            <div className="mba_Addres">
                <ul className='mba_Addres_ulList'>
                    <li><b>ADDRESS :</b></li>
                    <li>H.NO-2-2-1132/10/C,</li>
                    <li>R.K Nivas, 2nd Floor,</li>
                    <li>Opposite Bakers Q,</li>
                    <li>Shivam Road,</li>
                    <li>New Nallakunta,</li>
                    <li>Hyderabad-44.</li>
                    <li><i className='fa-solid fa-message'> </i> info@egradtutor.in</li>
                    <li><i className='fa-solid fa-location-dot'> </i> +91- 7993270532</li>
                </ul>
            </div>
            {/* Here we are using this div to write the queries of user */}
            <div className="mba_countactInputs" >
                {/* To write the input tags we are using form tag */}
               <form className='mba_contact_inputs' action="">
                {/* We are using this input tag to write the name of the user */}
                   <input type="text"  placeholder='First Name' required name="" id="" />
                   {/* We are using this input tag to write the lastname of the user */}
                   <input type="text"  placeholder='Last Name' name="" id=""  required/>
                   {/* We are using this input tag to write the email of the user */}
                   <input type="text"  placeholder='Your email address' name="" id="" required />
                   {/* We are using this textarea to write the user's query */}
                   <textarea placeholder='Message' name="" id="" cols="30" rows="10"></textarea>
                   {/* We are using this input tag to submit the  */}
                   <input className='mbasubmitbtn' type="submit" value="Submit" />
               </form>
            </div>
        </div>
    </div>
   </div>
  )
}

export default MbaContactUs