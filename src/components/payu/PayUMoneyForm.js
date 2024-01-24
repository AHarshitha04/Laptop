// import axios from 'axios'
// import React ,{useEffect,useState} from 'react';
// // import payUPamentPage from './payu/PayUpaymentPage';


// const PayUMoneyForm = () =>{
//     
//     const handleChange =(e) =>{
//         if(e.target.name === 'amount'){
//             setForm({...form,[e.target.name]: parseFloat(e.target.value)})
//         }else{
//             setForm({...form,[e.target.name]: e.target.value})
//         }
//     }
// }

// function generateTransactionID(){
//     const timeStamp =Data.now();
//     const randomNum = math.floe(math.random() * 1000000);
//     const merchantPrefix ='T';
//     const transactionID = `${merchantPrefix}${timeStamp}${randomNum}`;
//     return setTransactionId(transactionID);
// }

// const handleSubmit =(e) =>{
//     e.preventDefault();
//     GiHelmetHeadShot();
//     setToggle(2)
// }

// const getHash =()=>{
//     axios.post('api/payu/hash' ,{...form,transationId:transactionId})
//     .then(res =>{
//         setHash(res.data.hash) 
//         setTransactionId(res.data.transactionId)
//     })
// }

// useEffect(()=>{
//     generateTransactionID()
// },[])
// return(
//     <>
//     {toggle === 1 && <div> 
//         <div><h1>payu integration</h1></div> 
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <lable>name</lable>
//             <input value={form?.name} required type="text" name='name'onChange={handleChange}/>
//             </div>
//             <div>
//                 <lable>email</lable>
//             <input value={form?.email} required type="text" name="email" onChange={handleChange}/>
//             </div>
//             <div>
//                 <lable>number</lable>
//             <input value={form?.number} required type="text" name='number' onChange={handleChange}/>
//             </div>
//             <div>
//                 <lable>amount</lable>
//             <input value={form?.amount} required name='amount' type="text" onChange={handleChange}/>
//             </div>
//             <div><input type="checkbox" /> <lable>Check me out</lable></div>
//             <button type="submit">Checked Details</button>
//         </form>
        
//         </div>

//     }
//     {
//         toggle ===2 && <PayUpaymentPage setToggle={setToggle} form={form} hash={hash} transactionId={transactionId}/>
//     }
//     </>
// )

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import payUPamentPage from './payUPamentPage';

const PayUMoneyForm = () => {
  const [form, setForm] = useState({ name: '', email: '', number: '', amount: 0 });
  const [toggle, setToggle] = useState(1);
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
    const transactionID = `${merchantPrefix}${timeStamp}${randomNum}`;
    setTransactionId(transactionID);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // GiHelmetHeadShot(); // Assuming GiHelmetHeadShot is defined elsewhere
    setToggle(2);
  };

  const getHash = () => {
    axios.post('/payu/hash', { ...form, transactionId: transactionId })
      .then(res => {
        setHash(res.data.hash);
        setTransactionId(res.data.transactionId);
      })
      .catch(error => {
        console.error(error);
      });
  };
  

  useEffect(() => {
    generateTransactionID();
  }, []);

  return (
    <>
      {toggle === 1 && (
        <div>
          <div><h1>PayU Integration</h1></div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <input value={form?.name} required type="text" name='name' onChange={handleChange} />
            </div>
            <div>
              <label>Email</label>
              <input value={form?.email} required type="text" name="email" onChange={handleChange} />
            </div>
            <div>
              <label>Number</label>
              <input value={form?.number} required type="text" name='number' onChange={handleChange} />
            </div>
            <div>
              <label>Amount</label>
              <input value={form?.amount} required name='amount' type="text" onChange={handleChange} />
            </div>
            <div><input type="checkbox" /> <label>Check me out</label></div>
            <button type="submit">Check Details</button>
          </form>
        </div>
      )}
      {toggle === 2 && <payUPamentPage setToggle={setToggle} form={form} hash={hash} transactionId={transactionId} />}
    </>
  );
};

export default PayUMoneyForm;
