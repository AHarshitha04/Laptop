const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5001;
// app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const jsSHA = require('jssha');
const axios = require('axios');
const FormData = require('form-data');
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
const path = require('path');
const imagesDirectory = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(imagesDirectory));
const ughomepage_banner_login = require('./mainWebsitAdmin/ughomepage_banner_login')
require("dotenv").config();
//---------------------- databases admin_project imports ----------------------
const db1 = require('./databases/db1');
//---------------------- databases admin_project1  imports----------------------
const db2=require('./databases/db2');

//---------------------- admin router imports ----------------------
const Dashboard = require('./otsadmin/Dashboard')
const ExamCreation = require('./otsadmin/ExamCreation')
const CoureseCreation=require("./otsadmin/CoureseCreation")
const InstructionCreation = require('./otsadmin/InstructionCreation')
const TestCreation = require('./otsadmin/TestCreation')
const DocumentUpload =require('./otsadmin/DocumentUpload')
const ImeageUpload =require('./otsadmin/ImeageUpload')



//-------------------- quiz router imports -------------------------------------

const Cards =require('./quiz_ots/Cards')
const QuestionPaper = require('./quiz_ots/QuestionPaper')



//-------------------- empolyee portal imports -------------------------------------

const Empoyee_protal=require("./EMPLOYEE_PORTAL/Empoyee_protal")

app.use(cors({ origin: "*" }));

//ughomepage_banner_login

app.use('/ughomepage_banner_login', ughomepage_banner_login)

//---------------------- admin router  ----------------------


app.use('/Dashboard', Dashboard)
app.use('/ExamCreation', ExamCreation)
app.use('/CoureseCreation',CoureseCreation)
app.use('/InstructionCreation',InstructionCreation)
app.use('/TestCreation',TestCreation)
app.use('/DocumentUpload',DocumentUpload)
app.use('/ImeageUpload',ImeageUpload)

//-------------------- quiz router  -------------------------------------

app.use('/Cards',Cards)
app.use('/QuestionPaper',QuestionPaper)

//-------------------- empolyee portal  -------------------------------------
const Employee_info=require('./EMPLOYEE_PORTAL/Employee_Info')
app.use("/Empoyee_protal", Empoyee_protal);
app.use("/Employee_info", Employee_info);


//----------------------------------------------------Student Dashbord-------------------------------------------------------

const BuyCourses =require('./StudentDashboard/BuyCourses')

app.use("/BuyCourses", BuyCourses);

// app.post('/payu-proxy', async (req, res) => {
//   console.log(req.body);

//   try {

//     const txnid = 123;
//     const amount = 1;
//     const email = 'test@getMaxListeners.com';
//     const productinfo = 'testing env';
//     const firstname = 'John'; // Use actual user data here
//     const phone = '1234567890'; // Add phone parameter
//     const YOUR_MERCHANT_SALT = "WSRuqJafAmgvQ22Ztmzhixel1fTlZhgg";
//     const YOUR_MERCHANT_KEY = '2RJzQH';


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
//     const response = await axios.post('https://secure.payu.in/_payment', formData, {
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

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// const PayU =require('./quiz_ots/PayU')
// app.use("/PayU",PayU)
//  const PayU =require('./quiz_ots/PayU')





const PayU = require("payu");


const PayUClient = new PayU({
  key: '2RJzQH',
  salt: 'WSRuqJafAmgvQ22Ztmzhixel1fTlZhgg',
}, 'LIVE');

// const paymentDetails = {
//   // Provide your payment details here
// };

// Initiate the payment
// payuClient.paymentInitiate(paymentDetails)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

app.post('/payu-initiate', async (req, res) => {
  try {
    const {
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      phone,
      surl,
      furl,
      hash,
    } = req.body;

    if (!txnid) {
      return res.status(400).json({
        status: false,
        message: 'Transaction ID (txnid) is required.',
      });
    }

    // Use the PayUClient to initiate payment
    const paymentResult = await PayUClient.paymentInitiate({
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      phone,
      surl,
      furl,
      hash,
    });

    res.json(paymentResult);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      status: false,
      message: 'Internal Server Error',
    });
  }
});

//  app.use("/PayU",PayU)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });