import React from 'react'
import './contact.css'
// This is the code used for contact us in this have only two sections one is Address and other one is Input for user details and content type to contact with us.
const Contactus = () => {
  return (

    <div className='container Countact-contant' id='contact'>
      <div className='contactContainer'>
        <div className='addresList-contant'>
          <h1>CONTACT US</h1>
          <address>
            <b>ADDRESS :</b> H.NO-2-2-1132/10/C,R.K Nivas, 2nd Floor,Opposite Bakers Q,<br></br> Shivam Road, New Nallakunta,Hyderabad-44.
          </address>
          <div className='countactDit'>

            <div style={{ display: 'flex', gap: '10px' }}>
              <i class="fa-solid fa-phone"></i><p>+91- 7993270532</p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <i class="fa-solid fa-message"></i><p>info@egradtutor.in</p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <i class="fa-solid fa-location-dot"></i><p>+91- 7993270532</p>
            </div>

            <div className='linkIcons' style={{ display: 'flex', }}>
              <div className='bgIconLink'>
                <i class="fa-brands fa-facebook"></i>
              </div>

              <div className='bgIconLink'>
                <i class="fa-brands fa-instagram"></i>
              </div>

              <div className='bgIconLink'>
                <i class="fa-brands fa-linkedin"></i>
              </div>

              <div className='bgIconLink'>
                <i class="fa-brands fa-youtube"></i>
              </div>
            </div>

          </div>
        </div>
        {/* This is input form to contact us. */}
        <div className='Contact-contant'>
          <form>
            <input type='text' placeholder='First Name' required />

            <input type='text' placeholder='Last Name' required />

            <input type='text' placeholder='Your email address' required />

            <select className='textArea' id="cars">
              <option value="Queries">--Queries--</option>
              <option value="General EnQuery">General EnQuery</option>
              <option value="Exam EnQuery">Exam EnQuery</option>
              <option value="Course EnQuery">Course EnQuery</option>
              <option value="Payment related issue">Payment related issue</option>
            </select>



            <textarea rows={7} className='textArea' required placeholder='Message' />

            <div className='buttonClass'>
              <button className='butto'>SEND MESSAGE</button>

            </div>
          </form>

        </div>
      </div>
    </div>

  );
};

export default Contactus;














