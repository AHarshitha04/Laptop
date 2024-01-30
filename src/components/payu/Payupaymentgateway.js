import React, { useState } from 'react';
import axios from 'axios';
import jsSHA from 'jssha';

const Payupaymentgateway = () => {
  const [paymentResponse, setPaymentResponse] = useState(null);

  const initiatePayment = async () => {
    try {
      const txnid = 123;
      const amount = 1;
      const email = 'test@getMaxListeners.com';
      const productinfo = 'testing env';
      const firstname = 'John'; // Use actual user data here
      const phone = '1234567890'; // Add phone parameter
      const YOUR_MERCHANT_SALT = 'cZpZ0nxjmFYG3p5bZ0odsbtdGhpZlyWx';
      const YOUR_MERCHANT_KEY = '3LtnTS';

      // Create the hashString
      const hashString = `${YOUR_MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${phone}|||||||||${YOUR_MERCHANT_SALT}`;

      // Use the jsSHA library to generate the hash
      const sha = new jsSHA('SHA-512', 'TEXT');
      sha.update(hashString);
      const hash = sha.getHash('HEX');

      // Set up the required parameters for the PayU API
      const surl = 'http://localhost:3000/success';
      const furl = 'http://localhost:3000/';

      // Create FormData object
      const formData = new FormData();
      formData.append('key', YOUR_MERCHANT_KEY);
      formData.append('txnid', txnid);
      formData.append('amount', amount);
      formData.append('productinfo', productinfo);
      formData.append('firstname', firstname);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('surl', surl);
      formData.append('furl', furl);
      formData.append('hash', hash);

      // Make an HTTP request with axios
      const response = await axios.post('http://localhost:5001/payu-proxy', formData, {
        withCredentials: true,
      });

      // Update the state with the payment response
      setPaymentResponse(response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <button onClick={initiatePayment}>Initiate Payment</button>

      {paymentResponse && (
        <div>
          <h2>Payment Response:</h2>
          <pre>{JSON.stringify(paymentResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Payupaymentgateway;
