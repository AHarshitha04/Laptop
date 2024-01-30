const express = require("express");
const router = express.Router();
const db= require("../databases/db2");
const crypto = require('crypto');
// const{key,SALT_KEY} = require('../client/src/component/test');
const key='3LtnTS';
const SALT_KEY='cZpZ0nxjmFYG3p5bZ0odsbtdGhpZlyWx';


router.post("/hash", async (req, res) => {
  try {
    const { name, email, amount, productinfo, transactionId } = req.body;
    const data = {
      key: "3LtnTS",
      salt: 'cZpZ0nxjmFYG3p5bZ0odsbtdGhpZlyWx',
      txnid: transactionId,
      amount: amount,
      productinfo: 'TEST PRODUCT',
      firstname: name,
      email: email,
      undf1: 'details1',
      undf2: 'details2',
      undf3: 'details3',
      undf4: 'details4',
      undf5: 'details5',
    };

    const cryp = crypto.createHash('sha512');
    const string = data.key + '|' + data.txnid + '|' + data.amount + '|' + data.productinfo + '|' + data.firstname + '|' + data.email + '|' + data.undf1 + '|' + data.undf2 + '|' + data.undf3 + '|' + data.undf4 + '|' + data.undf5 + '|' + '||||||' + data.salt;

    cryp.update(string);
    const hash = cryp.digest('hex');

    return res.status(200).send({
      hash: hash,
      transactionId: transactionId,
    });
  } catch (error) {
    console.error('Error in /hash route:', error);
    return res.status(500).send({
      error: 'Internal Server Error',
    });
  }
});

router.post('/success',async(req,res) =>{
    console.log(req.body)
    return res.redirect('http://localhost:3000/success')
    try{}
    catch(error){

    }
})
router.post('/failure',async(req,res) =>{
    console.log(req.body)
    return res.redirect('http://localhost:3000/failure')
    try{}
    catch(error){
        
    }
})

// router.post('/payu-proxy', async (req, res) => {
//   console .log(req.body);

//   try {

//     const txnid = 123;
//     const amount = 1;
//     const email = 'test@getMaxListeners.com';
//     const productinfo = 'testing env';
//     const firstname = 'John'; // Use actual user data here
//     const phone = '1234567890'; // Add phone parameter
//     const YOUR_MERCHANT_SALT = 'cZpZ0nxjmFYG3p5bZ0odsbtdGhpZlyWx';
//     const YOUR_MERCHANT_KEY = '3LtnTS';


//     // Create the hashString
//     const hashString = `${YOUR_MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${phone}|||||||||${YOUR_MERCHANT_SALT}`;

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