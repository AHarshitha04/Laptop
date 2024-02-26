const express = require("express");
const router = express.Router();
// const db= require("../databases/db2");
const crypto = require('crypto');
// const path = require('path');
// const __dirname = path.resolve();
// const{key,SALT_KEY} = require('../client/src/component/test');
const key='2RJzQH';
const SALT_KEY='WSRuqJafAmgvQ22Ztmzhixel1fTlZhgg';
const jsSHA = require('jssha');
const axios = require('axios');
const multer = require('multer');
const upload = multer();
const nodemailer = require('nodemailer');
PAYU_BASE_URL = 'https://pmny.in/AJw4GvcdzI8V';
 
// Your route handling code
router.post("/hash", async (req, res) => {
    try {
        const { name, email, amount, productinfo, transactionId } = req.body;
        const data = {
            key: "2RJzQH",
            salt: 'WSRuqJafAmgvQ22Ztmzhixel1fTlZhgg',
            txnid: transactionId,
            amount: amount,
            productinfo: 'TEST PRODUCT',
            firstname: name,
            email: email,
            surl : '/success',
            furl : '/failure',
            udf1: 'details1',
            udf2: 'details2',
            udf3: 'details3',
            udf4: 'details4',
            udf5: 'details5',
        };
        const surl = '/success';
        const furl = '/failure';
        const hashString = `${data.key}|${data.txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|${data.udf1}|${data.udf2}|${data.udf3}|${data.udf4}|${data.udf5}||||||${data.salt}`;
        // const hashString = `${data.key}|${data.txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|${data.surl}|${data.furl}|${data.udf1}|${data.udf2}|${data.udf3}|${data.udf4}|${data.udf5}|||||${data.salt}`;

        // Using crypto library
        const cryp = crypto.createHash('sha512');
        cryp.update(hashString);
        const hash = cryp.digest('hex');
 
        // Using jsSHA library
        const sha = new jsSHA('SHA-512', 'TEXT');
        sha.update(hashString);
        const hashJsSHA = sha.getHash('HEX');
        
        console.log("Generated Hash:", hash);
        return res.status(200).send({
            hash: hash,
            hashJsSHA: hashJsSHA,
            transactionId: transactionId,
            surl: data.surl,
            furl: data.furl,
        });
        
    } catch (error) {
        console.error('Error in /hash route:', error);
        return res.status(500).send({
            error: 'Internal Server Error',
        });
    }
});


router.post('/success', upload.none(), async (req, res) => {
  try {
      console.log('Payment successful:', req.body);
      const successHtml = `
          <html>
              <head>
                  <title>Payment Successful</title>
              </head>
              <body>
                  <h1>Payment successful</h1>
                  <p>Your payment was successful. Thank you!</p>
                  <button id="redirectButton">Click here for eGradTutor website</button>

                  <script>
                      // Add a click event listener to the button
                      document.getElementById('redirectButton').addEventListener('click', function() {
                          // Redirect to your website when the button is clicked
                          window.location.href = 'https://www.egradtutor.in';
                      });
                  </script>
              </body>
          </html>
      `;

      const { name, date, number, mothername, fathername, contactno, address, email, college, amount } = req.body;
      const userEmail = req.body.email;
      console.log('Request Body:', req.body);
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'egradtutorweb@gmail.com', // Your email address
          pass: 'zzwj ffce jrbn tlhs', // Your email password
        },
      });
      const mailOptions = {
        from: 'egradtutorweb@gmail.com', // Sender email address
        to: userEmail, // Receiver email address (user's email)
        subject: 'Payment Successful', // Subject of the email
        text: 'Your payment has Successful.',
        html: `
        <html>
          <body>
            <h1>Payment Successful</h1>
            <p>Your payment was successful. Thank you!</p>
            <p>Name:  ${name}</p>
            <p>Date of Birth: ${date}</p>
            <p>Number: ${number}</p>
            <p>Mother's Name: ${mothername}</p>
            <p>Father's Name: ${fathername}</p>
            <p>Parents Contact No: ${contactno}</p>
            <p>Postal Address: ${address}</p>
            <p>Gmail ID:${email}</p>
            <p>College of Study: ${college}</p>
            <p>Amount: ${amount}</p>
          </body>
        </html>
      `,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).send({
            error: 'Internal Server Error',
          });
        } else {
          console.log('Email sent:', info.response);
          res.send('Payment successful. Email sent to the user.');
        }
      });
      res.send(successHtml);
  } catch (error) {
      console.error('Error in /success route:', error);
      res.status(500).send({
          error: 'Internal Server Error',
      });
  }
});


 
router.post('/failure', async (req, res) => {
    try {
      console.log('Payment failed:', req.body);
 
      // Extract user email from the form or any other source
      const userEmail = req.body.email; // Assuming email is in req.body.email
      const name = req.body.name;
      // Create a Nodemailer transporter using your email service credentials
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'egradtutorweb@gmail.com', // Your email address
          pass: 'zzwj ffce jrbn tlhs', // Your email password
        },
      });
 
      // Set up the email options
      const mailOptions = {
        from: 'egradtutorweb@gmail.com', // Sender email address
        to: userEmail, // Receiver email address (user's email)
        subject: 'Payment Failure', // Subject of the email
        text: 'Your payment has failed. Please try again.',
        name:name,
      };
 
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).send({
            error: 'Internal Server Error',
          });
        } else {
          console.log('Email sent:', info.response);
          res.send('Payment failed. Email sent to user.');
        }
      });
    } catch (error) {
      console.error('Error in /failure route:', error);
      res.status(500).send({
        error: 'Internal Server Error',
      });
    }
  });

  // router.post('/success',async(req,res) =>{
 
//     try{
//         console.log('Payment successful:', req.body);
//         res.send('Payment successful');

//         // return res.redirect('http://localhost:3000/success')
//     }catch(error){
 
//     }
// })

 
// router.post("/hash", async (req, res) => {
//     try {
//         const { name, email, amount, transactionId } = req.body;
//         const key = "2RJzQH";
//         const salt = 'WSRuqJafAmgvQ22Ztmzhixel1fTlZhgg';
//         const productinfo = 'TEST PRODUCT';
//         const surl = 'https://www.egradtutor.in/success';
//         const furl = 'https://www.egradtutor.in/failure';

//         const hashString = `${key}|${transactionId}|${amount}|${productinfo}|${name}|${email}||||||||||${salt}`;
//         console.log('Hash String:', hashString);

//         // Using crypto library
//         const cryp = crypto.createHash('sha512');
//         cryp.update(hashString);
//         const hash = cryp.digest('hex');

//         // Using jsSHA library
//         const sha = new jsSHA('SHA-512', 'TEXT');
//         sha.update(hashString);
//         const hashJsSHA = sha.getHash('HEX');

//         return res.status(200).send({
//             hash: hash,
//             hashJsSHA: hashJsSHA,
//             transactionId: transactionId,
//             surl: surl,
//             furl: furl,
//         });
//     } catch (error) {
//         console.error('Error in /hash route:', error);
//         return res.status(500).send({
//             error: 'Internal Server Error',
//         });
//     }
// });
 
 
// router.post('/success', (req, res) => {
//     // Handle successful payment response
//     console.log('Payment successful:', req.body);
//     res.send('Payment successful'); // You can customize the response
//   });
 
//   // Failure route
//   router.post('/failure', (req, res) => {
//     // Handle failed payment response
//     console.log('Payment failed:', req.body);
//     res.send('Payment failed'); // You can customize the response
//   });
 
// router.post('/payu-proxy', async (req, res) => {
//   console .log(req.body);
 
//   try {
//     const { firstname, email, amount, transactionId, number } = req.body;
 
//     const data = {
//         txnid: transactionId,
//         amount: amount,
//         email: email,
//         productinfo: 'TEST PRODUCT',
//         firstname: firstname,
//         phone: number,
//         YOUR_MERCHANT_SALT: 'cZpZ0nxjmFYG3p5bZ0odsbtdGhpZlyWx',
//         key: '3LtnTS',
//     };
   
   
   
   
 
 
//     // Create the hashString
// // Create the hashString
// const hashString = `${data.YOUR_MERCHANT_KEY}|${data.txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|${data.phone}|||||||||${data.YOUR_MERCHANT_SALT}`;
 
 
//     // Use the jsSHA library to generate the hash
//     const sha = new jsSHA('SHA-512', 'TEXT');
//     sha.update(hashString);
//     const hash = sha.getHash('HEX');
 
//     // Set up the required parameters for the PayU API
//     const surl = 'http://localhost:3000/success';
//     const furl = 'http://localhost:3000/';
 
//     // Create FormData object
//     const formData = new FormData();
//     formData.append('key', YOUR_MERCHANT_KEY);
//     formData.append('txnid', txnid);
//     formData.append('amount', amount);
//     formData.append('productinfo', productinfo);
//     formData.append('firstname', firstname);
//     formData.append('email', email);
//     formData.append('phone', phone);
//     formData.append('surl', surl);
//     formData.append('furl', furl);
//     formData.append('hash', hash);
 
//     // Make an HTTP request with axios
//     const response = await axios.post('https://test.payu.in/_payment', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//         // Add any other headers if needed
//       },
//     });
 
//     console.log(response.data);
 
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error:', error.message);
//     res.status(500).json({
//       status: false,
//       message: 'Internal Server Error',
//     });
//   }
// });
 
module.exports = router;