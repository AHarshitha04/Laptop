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
const { createProxyMiddleware } = require('http-proxy-middleware');
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
// app.use('/payu-proxy', createProxyMiddleware({ target: 'https://test.payu.in', changeOrigin: true }));

// app.post('/payu-proxy', async (req, res) => {
//   console.log(req.body);

//   try {
//     const txnid = 123;
//     const amount = 1;
//     const email = 'test@getMaxListeners.com';
//     const productinfo = 'testing env';
//     const firstname = 'John'; // Use actual user data here
//     const phone = '1234567890';
//     const YOUR_MERCHANT_SALT = 'cZpZ0nxjmFYG3p5bZ0odsbtdGhpZlyWx';
//     const YOUR_MERCHANT_KEY = '3LtnTS';

//     // Create the hashString
//     const hashString =
//       YOUR_MERCHANT_KEY +
//       '|' +
//       txnid +
//       '|' +
//       amount +
//       '|' +
//       productinfo +
//       '|' +
//       firstname +
//       '|' +
//       email +
//       '|' +
//       phone +
//       '||||||||||' +
//       YOUR_MERCHANT_SALT;

//     // Use the jsSHA library to generate the hash
//     const sha = new jsSHA('SHA-512', 'TEXT');
//     sha.update(hashString);
//     const hash = sha.getHash('HEX');

//     // Set up the required parameters for the PayU API
//     const surl = 'http://localhost:3000/success';
//     const furl = 'http://localhost:3000/';

//     // Create an object with the parameters
//     const requestData = {
//       key: YOUR_MERCHANT_KEY,
//       txnid: txnid,
//       amount: amount,
//       productinfo: productinfo,
//       firstname: firstname,
//       email: email,
//       phone: phone,
//       surl: surl,
//       furl: furl,
//       hash: hash,
//     };

//     // Make an HTTP request with axios
//     const response = await axios.post('https://test.payu.in/_payment', requestData, {
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/x-www-form-urlencoded', // Correct content type for form data
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

const PayU =require('./quiz_ots/PayU')
app.use("/PayU",PayU)
 








app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });