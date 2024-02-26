import React,{useEffect,useState} from 'react';
import axios from "axios";
import PayUPamentPage1 from "./PayUPamentPage1"
import './payu.css'
// const PAYU_BASE_URL = 'https://pmny.in/6rKJacqZnitG';
const Payu =() =>{
      const [form, setForm] = useState({ name: '', email: '', number: '', amount: 1 });
    const [toggle, setToggle] = useState(true);
    const [hash, setHash] = useState(null);
    const [transactionId, setTransactionId] = useState(null);
    const handleChange = (e) => {
            if (e.target.name === 'amount') {
              setForm({ ...form, [e.target.name]: parseFloat(e.target.value) });
            } else {
              setForm({ ...form, [e.target.name]: e.target.value });
            }
          };

          function generateTransactionID() {
    const timeStamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000000);
    const merchantPrefix = 'T';
    const transactionId = `${merchantPrefix}${timeStamp}${randomNum}`;
    setTransactionId(transactionId);
  }

  const handleSubmit = (e) => {
        e.preventDefault();

        // const payULink = `${PAYU_BASE_URL}?amount=${form.amount}&name=${form.name}&email=${form.email}&transactionId=${transactionId}&returnUrl=https://www.egradtutor.in&other_parameters=...`;

        // window.location.replace(payULink);
    //     const formData = new FormData();
    // formData.append('name', form.name);
    // formData.append('date', form.date);
    // formData.append('number', form.number);
    // formData.append('mothername', form.mothername);
    // formData.append('fathername', form.fathername);
    // formData.append('contactno', form.contactno);
    // formData.append('address', form.address);
    // formData.append('email', form.email);
    // formData.append('college', form.college);
    // fetch('/success', {
    //   method: 'GET',
    //   body: formData,
      
    //   headers: {
    //     // Include necessary headers for form data
    //     'Content-Type': 'multipart/form-data',
    //   },
      
    // })
  

    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });

        getHash();
    setToggle(2);
    // console.log('Form Data:', formData);
  }

  const getHash = () => {
        axios.post('http://localhost:5001/PayU/hash', { ...form, transactionId: transactionId })
          .then(res => {
            setHash(res.data.hash);
            setTransactionId(res.data.transactionId);
            console.log("Generated Hash (Client Side):", res.data.hash);
          })
          .catch(error => {
            console.error(error);
          });
        }
   useEffect(() => {
               generateTransactionID()
  }, []);
   
  return (
    <>
      {toggle   && (
            <div className="payujsx_container">
              <h1>eGradTutor</h1>

              <div className="payujsx_form_container">
              <form onSubmit={handleSubmit}>
                <div>
                  <label className='payulabel'>Name(As in 10th Memo)</label>
                  <input className="payuinput"  value={form.name} required type="text" name='name' onChange={handleChange} />
                </div>
 
                <div>
                  <label className='payulabel'>Date of Birth</label>
                  <input className="payuinput"  value={form?.date} required type="date" name='date' onChange={handleChange} />
                </div>
                <div>
                  <label className='payulabel'>Number</label>
                  <input className="payuinput"  value={form?.number} required type="text" name='number' onChange={handleChange} />
                </div>
 
                <div>
                  <label className='payulabel'>Mother's Name</label>
                  <input className="payuinput"  value={form?.mothername} required type="text" name='mothername' onChange={handleChange} />
                </div>
 
                <div>
                  <label className='payulabel'>Father's Name</label>
                  <input className="payuinput"  value={form?.fathername} required type="text" name='fathername' onChange={handleChange} />
                </div>
 
                <div>
                  <label className='payulabel'>Parents Contact No</label>
                  <input className="payuinput"  value={form?.contactno} required type="text" name='contactno' onChange={handleChange} />
                </div>
 
               
                <div>
                  <label className='payulabel'>Postal Address</label>
                  <input className="payuinput"  value={form?.address} required type="text" name='address' onChange={handleChange} />
                </div>
 
                <div>
                  <label className='payulabel'>Gmail ID</label>
                  <input  className="payuinput" value={form?.email} required type="text" name="email" onChange={handleChange} />
                </div>
 
                 <div>
                  <label className='payulabel'>College of Study</label>
                  <input className="payuinput"  value={form?.college} required type="text" name="college" onChange={handleChange} />
                </div>
                <div>
                <label className="payulabel">Amount</label>
                <span className="payuinput">{form.amount}</span>
              </div>
             
                 <button className='payubutton' type="submit">submit</button>
              </form>
              </div>
            </div>
          )}
          {toggle===2 && <PayUPamentPage1 setToggle={setToggle} form={form} hash={hash} transactionId={transactionId} />} 

    </>
  )

}

export default Payu
 
// const Payu = () => {
//     const [form, setForm] = useState({ name: '', email: '', number: '', amount: 0 });
//     const [toggle, setToggle] = useState(true);
//     const [hash, setHash] = useState(null);
//     const [transactionId, setTransactionId] = useState(null);
//     const handleChange = (e) => {
//             if (e.target.name === 'amount') {
//               setForm({ ...form, [e.target.name]: parseFloat(e.target.value) });
//             } else {
//               setForm({ ...form, [e.target.name]: e.target.value });
//             }
//           };


// function generateTransactionID() {
//     const timeStamp = Date.now();
//     const randomNum = Math.floor(Math.random() * 1000000);
//     const merchantPrefix = 'T';
//     const transactionId = `${merchantPrefix}${timeStamp}${randomNum}`;
//     setTransactionId(transactionId);
//   }
 
//     const handleSubmit = (e) => {
//     e.preventDefault();
// //     // GiHelmetHeadShot(); // Assuming GiHelmetHeadShot is defined elsewhere

// //     // const payULink = `${PAYU_BASE_URL}?amount=${form.amount}&name=${form.name}&email=${form.email}&transactionId=${transactionId}&returnUrl=https://www.egradtutor.in&other_parameters=...`;
    
// //     const payULink = `${PAYU_BASE_URL}?amount=${encodeURIComponent(form.amount)}&name=${encodeURIComponent(form.name)}&email=${encodeURIComponent(form.email)}&transactionId=${encodeURIComponent(transactionId)}&returnUrl=${encodeURIComponent('https://www.egradtutor.in')}&other_parameters=...`;

// //     console.log('Before redirection');
// //    window.location.replace(payULink);
// //     console.log('After redirection');
    

// //     axios.post('https://www.egradtutor.in/submitForm', { ...form, transactionId: transactionId })
// //     .then((res) => {
// //       console.log(res.data);
// //     })
// //     .catch((error) => {
// //       console.error(error);
// //     });
//     getHash();
//     setToggle(2);
//   };
  
//     const getHash = () => {
//     axios.post('http://localhost:5001/PayU/hash', { ...form, transactionId: transactionId })
//       .then(res => {
//         setHash(res.data.hash);
//         setTransactionId(res.data.transactionId);
//       })
//       .catch(error => {
//         console.error(error);
//       });

//     // getHash();
//     //  generateTransactionID();
//     //  getHash();
//     // setToggle(2);
//   // };

// //   const getHash = () => {
// //     try {
// //       const response =  axios.post('https://www.egradtutor.in/hash', { ...form, transactionId: transactionId });
// //       setHash(response.data.hash);
// //       setTransactionId(response.data.transactionId);
// //     } catch (error) {
// //       console.error('Error getting hash:', error);
// //     }

// //   };
 
 
 
//     useEffect(() => {
       
//     generateTransactionID()
//   }, []);
 
//   return (
//     <>
//           {toggle   && (
//             <div className="payujsx_container">
//               <h1>eGradTutor</h1>

//               <div className="payujsx_form_container">
//               <form onSubmit={handleSubmit}>
//                 <div>
//                   <label className='payulabel'>Name(As in 10th Memo)</label>
//                   <input className="payuinput"  value={form?.name} required type="text" name='name' onChange={handleChange} />
//                 </div>
 
//                 <div>
//                   <label className='payulabel'>Date of Birth</label>
//                   <input className="payuinput"  value={form?.date} required type="date" name='date' onChange={handleChange} />
//                 </div>
//                 <div>
//                   <label className='payulabel'>Number</label>
//                   <input className="payuinput"  value={form?.number} required type="text" name='number' onChange={handleChange} />
//                 </div>
 
//                 <div>
//                   <label className='payulabel'>Mother's Name</label>
//                   <input className="payuinput"  value={form?.mothername} required type="text" name='mothername' onChange={handleChange} />
//                 </div>
 
//                 <div>
//                   <label className='payulabel'>Father's Name</label>
//                   <input className="payuinput"  value={form?.fathername} required type="text" name='fathername' onChange={handleChange} />
//                 </div>
 
//                 <div>
//                   <label className='payulabel'>Parents Contact No</label>
//                   <input className="payuinput"  value={form?.contactno} required type="text" name='contactno' onChange={handleChange} />
//                 </div>
 
               
//                 <div>
//                   <label className='payulabel'>Postal Address</label>
//                   <input className="payuinput"  value={form?.address} required type="text" name='address' onChange={handleChange} />
//                 </div>
 
//                 <div>
//                   <label className='payulabel'>Gmail ID</label>
//                   <input  className="payuinput" value={form?.email} required type="text" name="email" onChange={handleChange} />
//                 </div>
 
//                  <div>
//                   <label className='payulabel'>College of Study</label>
//                   <input className="payuinput"  value={form?.college} required type="text" name="college" onChange={handleChange} />
//                 </div>
                
//                 {/* <div>
//                   <label className='payulabel'>Amount</label>
//                   <input  className="payuinput" value={form?.amount} required name='amount' type="number" onChange={handleChange} />
//                 </div> */}
//                  <button className='payubutton' type="submit">submit</button>
//               </form>
//               </div>
//             </div>
//           )}
//           {toggle===2 && <PayUPamentPage1 setToggle={setToggle} form={form} hash={hash} transactionId={transactionId} />} 
//         </>
//   )
// }





// https://cbjs.payu.in/sdk/success
// https://cbjs.payu.in/sdk/failure