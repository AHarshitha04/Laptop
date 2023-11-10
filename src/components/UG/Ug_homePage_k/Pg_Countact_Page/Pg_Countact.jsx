import React from 'react'
import './Pg_Countact.css'

export const Pg_Countact = () => {
  return (
   <div className='Pg_contact_bg'>
     <div className='Pg_Container Pg_contacttUs'>
         <h1>CONTACT US</h1>
        <div className="Pg_Countact-contant">
            <div className="Pg_map">
            <iframe class="text1"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15229.163610218158!2d78.5120985!3d17.3978217!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9994cb7e0b83%3A0x4090f289cc85203c!2seGATE%20Tutor%20Academy!5e0!3m2!1sen!2sin!4v1688728318933!5m2!1sen!2sin"
               allowfullscreen="" loading="lazy"
               referrerpolicy="no-referrer-when-downgrade">
            </iframe>
            </div>
            <div className="Pg_Addres">
                <ul className='Pg_Addres_ulList'>
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
            <div className="Pg_countactInputs" >
               <form className='Pg_contact_inputs' action="">
                   <input type="text"  placeholder='First Name' required name="" id="" />
                   <input type="text"  placeholder='Last Name' name="" id=""  required/>
                   <input type="text"  placeholder='Your email address' name="" id="" required />

                   <textarea placeholder='Message' name="" id="" cols="30" rows="10"></textarea>
                   <input type="submit" value="Submit" />
               </form>
            </div>
        </div>
    </div>
   </div>
  )
}
