const express = require("express");
const router = express.Router();
const db= require("../databases/db2");
const multer = require("multer");
const cors = require("cors");
const nodemailer = require('nodemailer');
const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
      //callback(null, "public/images");
      callback(null, "uploads/OtsStudentimeages");
    },
    filename: (req, file, callback) => {
      callback(null, `image-${Date.now()}.${file.originalname}`);
    },
  });
  const uploads = multer({ storage: imgconfig });
  router.use(cors());
  router.use(express.json());
  router.use(express.urlencoded({extended: false}));
router.use(express.static("public"))
router.get("/coursedataSRP/:courseCreationId", async (req, res) => {
    const { courseCreationId } = req.params;
    try {
      // Fetch exams from the database
      const [rows] = await db.query(
        "SELECT cc.courseName, cc.courseYear, cc.courseCreationId, e.examName, s.subjectName FROM course_creation_table AS cc LEFT JOIN exams AS e ON cc.examId = e.examId LEFT JOIN course_subjects AS cs ON cc.courseCreationId = cs.courseCreationId LEFT JOIN subjects AS s ON cs.subjectId = s.subjectId WHERE cc.courseCreationId = ?",
        [courseCreationId]
      );
  
      // Organize the data into a JSON structure
      const organizedData = {};
      rows.forEach((row) => {
        const courseId = row.courseCreationId;
        if (!organizedData[courseId]) {
          organizedData[courseId] = {
            examName: row.examName,
            courseName: row.courseName,
            courseYear: row.courseYear,
            subjects: [row.subjectName], // Initialize subjects as an array
          };
        } else {
          organizedData[courseId].subjects.push(row.subjectName);
        }
      });
  
      res.json(Object.values(organizedData)); // Convert the object values to an array for the response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/gender", async (req, res) => {
    // FetchData
    try {
      const [rows] = await db.query("SELECT * FROM gender");
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/Category", async (req, res) => {
    // FetchData
    try {
      const [rows] = await db.query("SELECT * FROM category");
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/states", async (req, res) => {
    // FetchData
    try {
      const [rows] = await db.query("SELECT * FROM states");
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/districts/:state_id", async (req, res) => {
    const { state_id } = req.params;
    // FetchData
    try {
      const [rows] = await db.query('SELECT * FROM districts WHERE state_id = ?', [state_id]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/batch", async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM batch");
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/Qualifications", async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM educationstatus");
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

////////////////////////////////////////////////////////working/////////////////////////////


router.post('/studentForm/:courseCreationId',  uploads.fields([
  { name: "files1", maxCount: 1 },
  { name: "filess", maxCount: 1 },
  { name: 'filess3', maxCount: 1 }
]),async (req, res) => {
  let mailOptions; 
  try {
    const formData = req.body;
    const files = req.files;
    if (typeof files === 'object' && files !== null && files.files1) {
      const filename1 = files.files1[0].filename;
      const filename2 = files.filess[0].filename;
      const filename3 = files.filess3[0].filename;

      const courseCreationId = req.params.courseCreationId;
      const generatedPassword = generateRandomPassword();
      const query = `
        INSERT INTO otsstudentregistation 
          (candidateName, dateOfBirth, GenderId, CategoryId, emailId, confirmEmailId, contactNo, fatherName, occupation, mobileNo, line1, state_id, districts_id, pincode, BatchId, edStatusId, NameOfCollege, passingYear, marks, UplodadPhto, Signature, Proof,password)
         VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
       
        formData.candidateName,
        formData.dateOfBirth,
        formData.GenderId,
        formData.CategoryId,
        formData.emailId,
        formData.confirmEmailId,
        formData.contactNo,
        formData.fatherName,
        formData.occupation,
        formData.mobileNo,
        formData.line1,
        formData.state_id,
        formData.districts_id,
        formData.pincode,
        formData.BatchId,
        formData.edStatusId,
        formData.NameOfCollege,
        formData.passingYear,
        formData.marks,
        filename1,
        filename2,
        filename3,
        generateRandomPassword(),
      ];

      await db.query(query, values);

      const [result] = await db.query('SELECT LAST_INSERT_ID() AS studentregistationId');
      const insertId = result[0].studentregistationId;
      const courseOrdersQuery = `
        INSERT INTO courseOrders 
          (courseCreationId, studentregistationId)
        VALUES (?, ?)
      `;
      const courseOrdersValues = [
        courseCreationId,
        insertId,
      ];

      await db.query(courseOrdersQuery, courseOrdersValues);
 // Sending email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com', // Corrected host
      auth: {
        user: 'egradtutorweb@gmail.com',
        pass: 'zzwj ffce jrbn tlhs'
      }
    });

 async function getGenderName(id) {
  try {
    const [result] = await db.query('SELECT Gander FROM gender WHERE GenderId = ?', [id]);
    return result[0] ? result[0].Gander : '';
  } catch (error) {
    console.error('Error fetching gender name:', error);
    throw error;
  }
}

    
    // Function to get category name
    async function getCategoryName(id) {
      const [result] = await db.query('SELECT Category FROM category WHERE CategoryId = ?', [id]);
      return result[0] ? result[0].Category : '';
    }
    
    // Function to get state name
    async function getStateName(id) {
      const [result] = await db.query('SELECT name FROM states WHERE state_id = ?', [id]);
      return result[0] ? result[0].name : '';
    }
    
    // Function to get district name
    async function getDistrictName(id) {
      const [result] = await db.query('SELECT districts_name FROM districts WHERE districts_id = ?', [id]);
      return result[0] ? result[0].districts_name : '';
    }
    
    // Function to get batch name
    async function getBatchName(id) {
      const [result] = await db.query('SELECT Batch FROM batch WHERE BatchId = ?', [id]);
      return result[0] ? result[0].Batch : '';
    }
    
    // Function to get qualification name
    async function getQualificationName(id) {
      const [result] = await db.query('SELECT educationStatus FROM educationstatus WHERE edStatusId = ?', [id]);
      return result[0] ? result[0].educationStatus : '';
    }
    
    // Inside your mailOptions
    let genderName = '';
    let categoryName = '';
    let stateName = '';
    let districtName = '';
    let batchName = '';
    let qualificationName = '';
try {
   [
    genderName,
    categoryName,
    stateName,
    districtName,
    batchName,
    qualificationName
  ] = await Promise.all([
    getGenderName(formData.GenderId),
    getCategoryName(formData.CategoryId),
    getStateName(formData.state_id),
    getDistrictName(formData.districts_id),
    getBatchName(formData.BatchId),
    getQualificationName(formData.edStatusId),
  ]);
   mailOptions = {
    from: 'egradtutorweb@gmail.com',
    to: formData.emailId, 
    subject: 'Form Submission Confirmation',
    html: `
    <img src="Backend\logo\logo.png" alt="eGradTutor">
      <p>Thank you for submitting the form. Your details have been received:</p>
      <div>
        <p>Candidate Name: ${formData.candidateName}</p>
        <p>Date of Birth: ${formData.dateOfBirth}</p>
        <p>Gender: ${genderName}</p>
        <p>Category: ${categoryName}</p>
        <p>Contact No: ${formData.contactNo}</p>
        <p>Father's Name: ${formData.fatherName}</p>
        <p>Occupation: ${formData.occupation}</p>
        <p>Mobile No: ${formData.mobileNo}</p>
        <p>Address: ${formData.pne1}</p>
        <p>State: ${stateName}</p>
        <p>District: ${districtName}</p>
        <p>Pincode: ${formData.pincode}</p>
        <p>Batch: ${batchName}</p>
        <p>Quapfication: ${qualificationName}</p>
        <p>College Name: ${formData.NameOfCollege}</p>
        <p>Passing Year: ${formData.passingYear}</p>
        <p>Marks: ${formData.marks}</p>
      </div>
    `
  };
} catch (error) {
  console.error('Error getting data for mail:', error);
  res.status(500).json({ message: 'Internal server error' });
}

  //   const [result] = await db.query('SELECT LAST_INSERT_ID() AS studentregistationId');
  //   const insertId = result[0].studentregistationId;
    
  //   const generatedPassword = generateRandomPassword();

  //   const loginQuery = `
  //   INSERT INTO studentlogins (studentregistationId, emailId, password)
  //   VALUES (?, ?, ?)
  // `;
  // const loginValues = [insertId, formData.emailId, generatedPassword];
  // await db.query(loginQuery, loginValues);

    const loginMailOptions = {
      from: 'egradtutorweb@gmail.com',
      to: formData.emailId,
      subject: 'Login Details',
      html: `
        <p>Thank you for registering. Here are your login details:</p>
        <ul>
          <li>Email: ${formData.emailId}</li>
          <li>Password: ${generatedPassword}</li>
        </ul>
      `,
    };
    transporter.sendMail(loginMailOptions, (error, info) => {
      if (error) {
        console.error('Error sending login email:', error);
      } else {
        console.log('Login email sent:', info.response);
      }
    });

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
    res.status(201).json({ message: 'Form submitted successfully' });
  }else {
    // Handle missing or invalid files
    res.status(400).json({ message: 'File uploads are missing or invalid.' });
  } 
} catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

function generateRandomPassword() {
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';

  // Generate random characters
  const randomUppercase1 = uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
  const randomUppercase2 = uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
  const randomLowercase1 = lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];
  const randomLowercase2 = lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];
  const randomNumber1 = numbers[Math.floor(Math.random() * numbers.length)];  
  const randomNumber2 = numbers[Math.floor(Math.random() * numbers.length)];           

  // Concatenate characters to form the password
  const password = randomUppercase1 + randomUppercase2 + randomNumber2 + randomLowercase2 + randomNumber1 +randomLowercase1 ;

  return password;
}
/////////////////////////////////////////////////////////end/////////////////////


  
//   router.post("/student", uploads.fields([
//     { name: "files1", maxCount: 1 },
//     { name: "filess", maxCount: 1 },
//     { name: 'filess3', maxCount: 1 }
//   ]), async (req, res) => {
//     try {
//       const {
//         CandidateName,
//         DataOfBirth,
//         Gender,
//         Category,
//         EmailId,
//         ConfirmEmailId,
//         ContactNo,
//         FathersName,
//         Occupation,
//         MobileNo,
//         Addres,
//         CityTown,
//         State,
//         Distric,
//         PinCode,
//         batch,
//         Qualification,
//         NameOfCollage,
//         Passingyear,
//         MarksIn,
//       } = req.body;
  
//       const files = req.files;
  
//       const filename1 = files.files1[0].filename;
//       const filename2 = files.filess[0].filename;
//       const filename3 = files.filess3[0].filename;
  
//       console.log(files);
  
//       const sql = "INSERT INTO studentdat SET ?";
//       const values = {
//         CandidateName,
//         DataOfBirth,
//         Gender,
//         Category,
//         EmailId,
//         ConfirmEmailId,
//         ContactNo,
//         FathersName,
//         Occupation,
//         MobileNo,
//         Addres,
//         CityTown,
//         State,
//         Distric,
//         PinCode,
//         batch,
//         Qualification,
//         NameOfCollage,
//         Passingyear,
//         MarksIn,
//         UplodadPhto: filename1,
//         Signature: filename2,
//         Proof: filename3,
//       };
//       await db.queryAsync(sql, values);
     

      

//    // Sending email
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       host: 'smtp.gmail.com', // Corrected host
//       auth: {
//         user: 'webdriveegate@gmail.com',
//         pass: 'qftimcrkpkbjugav'
// zzwj ffce jrbn tlhs
//       }
//     });

//     const mailOptions = {
//       from: 'webdriveegate@gmail.com',// sender address
//       to:[ req.body.EmailId, 'sravankumarkurumelli@gmail.com', 'sravan.k@egradtutor.in'], // list of receivers
//       subject: req.body.EmailId, // Subject line
//       text:req.body.CandidateName,
//       text:req.body.DataOfBirth,
//       text:req.body.Gender,
//       text:req.body.Category,
//       text:req.body.ConfirmEmailId,
//       text:req.body.ContactNo,
//       text:req.body.FathersName,
//       text:req.body.Occupation,
//       text:req.body.MobileNo,
//       text:req.body.Addres,
//       text:req.body.CityTown,
//       text:req.body.State,
//       text:req.body.Distric,
//       text:req.body.PinCode,
//       text:req.body.batch,
//       text:req.body.Qualification,
//       text:req.body.NameOfCollage,
//       text:req.body.PassingYear,
//       text:req.body.MarksIn,
    
//       html: `
//       <div style="padding:10px;">
     
//       <h3>Your submitted data</h3>
      
      

//       <ul style='color:red,list-style:none'>
      
//           <li>Email: ${req.body.EmailId}</li>
//           <li>CONFIRM EMAIL ID: ${req.body.ConfirmEmailId}</li>
//           <li>CANDIDATE NAME: ${req.body.CandidateName}</li>
//           <li>DATE OF BIRTH: ${req.body.DataOfBirth}</li>
//           <li>GENDER: ${req.body.Gender}</li>
//           <li>CATEGORY: ${req.body.Category}</li>
//           <li>CONTACT NO: ${req.body.ContactNo}</li>
//           <li>FATHER'S NAME: ${req.body.FathersName}</li>
//           <li>OCCUPATION: ${req.body.Occupation}</li>
//           <li>MOBILE NO: ${req.body.MobileNo}</li>
//           <li>LINE 1: ${req.body.Addres}</li>
//           <li>CITY/TOWN: ${req.body.CityTown}</li>
//           <li>STATE: ${req.body.State}</li>
//           <li>DISTRICT: ${req.body.Distric}</li>
//           <li>PINCODE: ${req.body.PinCode}</li>
//           <li>SESSION: ${req.body.Session}</li>
//           <li>COURSE: ${req.body.Course}</li>
//           <li>EXAM: ${req.body.Exam}</li>
//           <li>SUBJECTS: ${req.body.Stream1}</li>
//           <li>BATCH: ${req.body.batch}</li>
//           <li>QUALIFICATION: ${req.body.Qualification}</li>
//           <li>NAME OF COLLEGE (WITH CITY): ${req.body.NameOfCollage}</li>
//           <li>PASSING YEAR: ${req.body.PassingYear}</li>
//           <li>MARKS IN %: ${req.body.MarksIn}</li>

//         <p>Any query aobut our courses visit our website </p>
//         <h1>www.egradtutor.in</h1>

//       <img src='cid:myImg' alt='dd' />
//       </ul>
//       `
//   };
//   await sendMail(mailOptions);
//   return res.status(200).json({ success: true, message: "Record inserted successfully" });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: "Error in database operation" });
//     }
//   });
  
// const sendMail = (options) => {
//     return new Promise((resolve, reject) => {
//       transporter.sendMail(options, (error, info) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(info);
//         }
//       });
//     });
//   };
  
  router .get("/read/:id", (req,res) => {
    const sql = "SELECT * FROM studentdat WHERE id = ?";
    const Id = req.params.id;
   
    db.query(sql, [Id],(err,result) => {
        if(err) return res.json({Message: 'EROR in server'});
        return res.json(result);
    })
})
router.get("/", (req,res) => {
    const sql = "select * from studentdat ORDER BY id DESC LIMIT 1";
   //const sql = "SELECT *FROM  studentdata WHERE ID=(SELECT LAST_INSERT_ID())";
  // const Id = req.params.id;
  
   db.query(sql,(err,result) => {
       if(err) return res.json({Message: 'EROR in server getting data'});
       return res.json(result);
   })
})

const imgconfi = multer.diskStorage({
    destination: (req, file, callback) => {
      //callback(null, "public/images");
      callback(null, "../public");
    },
    filename: (req, file, callback) => {
      callback(null, `rea-${Date.now()}.${file.originalname}`);
    },
  });
  const upload = multer({ storage: imgconfi });


  router.put("/update/:id", upload.fields([{ name: 'UplodadPhto' }, { name: 'Signature' }, { name: 'Proof' }]), async (req, res) => {
    try {
      const sql = "UPDATE studentdat SET `CandidateName`=?, `DataOfBirth`=?, `Category`=?, `EmailId`=?, `ConfirmEmailId`=?, `ContactNo`=?,  `FathersName`=?, `Occupation`=?, `MobileNo`=?, `Addres`=?, `CityTown`=?, `State`=?, `Distric`=?, `PinCode`=?, `Session`=?, `Course`=?, `Exam`=?, `Stream1`=?, `batch`=?, `Qualification`=?, `NameOfCollage`=?, `Passingyear`=?, `MarksIn`=?, `UplodadPhto`=?, `Signature`=?, `Proof`=? WHERE ID=?";
    
      const Id = req.params.id;
      const {
        CandidateName,
        DataOfBirth,
        Category,
        EmailId,
        ConfirmEmailId,
        ContactNo,
        FathersName,
        Occupation,
        MobileNo,
        Addres,
        CityTown,
        State,
        Distric,
        PinCode,
        batch,
        Qualification,
        NameOfCollage,
        Passingyear,
        MarksIn,
      } = req.body;
  
      const files = req.files;
      const UplodadPhtoPath = files.UplodadPhto[0].filename;
      const SignaturePath = files.Signature[0].filename;
      const ProofPath = files.Proof[0].filename;
  
      await db.queryAsync(
        sql,
        [
          CandidateName,
          DataOfBirth,
          Category,
          EmailId,
          ConfirmEmailId,
          ContactNo,
          FathersName,
          Occupation,
          MobileNo,
          Addres,
          CityTown,
          State,
          Distric,
          PinCode,
          batch,
          Qualification,
          NameOfCollage,
          Passingyear,
          MarksIn,
          UplodadPhtoPath,
          SignaturePath,
          ProofPath,
          Id,
        ]
      );
  
      // Nodemailer setup
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'webdriveegate@gmail.com',
          pass: 'qftimcrkpkbjugav',
        },
      });
  
      const mailOptions = {
        from: 'webdriveegate@gmail.com',
        to: [req.body.EmailId, 'sravankumarkurumelli@gmail.com', 'sravan.k@egradtutor.in'],
        subject: req.body.EmailId,
        text: req.body.CandidateName,
        text:req.body.DataOfBirth,
    text:req.body.Gender,
    text:req.body.Category,
    text:req.body.ConfirmEmailId,
    text:req.body.ContactNo,
    text:req.body.FathersName,
    text:req.body.Occupation,
    text:req.body.MobileNo,
    text:req.body.Addres,
    text:req.body.CityTown,
    text:req.body.State,
    text:req.body.Distric,
    text:req.body.PinCode,
    text:req.body.batch,
    text:req.body.Qualification,
    text:req.body.NameOfCollage,
    text:req.body.PassingYear,
    text:req.body.MarksIn,
  
        html: `
          <div style="padding:10px;">
            <h3>Your submitted data</h3>
            <ul style='color:red,list-style:none'>
            <li>Email: ${req.body.EmailId}</li>
            <li>CONFIRM EMAIL ID: ${req.body.ConfirmEmailId}</li>
            <li>CANDIDATE NAME: ${req.body.CandidateName}</li>
            <li>DATE OF BIRTH: ${req.body.DataOfBirth}</li>
            <li>GENDER: ${req.body.Gender}</li>
            <li>CATEGORY: ${req.body.Category}</li>
            <li>CONTACT NO: ${req.body.ContactNo}</li>
            <li>FATHER'S NAME: ${req.body.FathersName}</li>
            <li>OCCUPATION: ${req.body.Occupation}</li>
            <li>MOBILE NO: ${req.body.MobileNo}</li>
            <li>LINE 1: ${req.body.Addres}</li>
            <li>CITY/TOWN: ${req.body.CityTown}</li>
            <li>STATE: ${req.body.State}</li>
            <li>DISTRICT: ${req.body.Distric}</li>
            <li>PINCODE: ${req.body.PinCode}</li>
            <li>SESSION: ${req.body.Session}</li>
            <li>COURSE: ${req.body.Course}</li>
            <li>EXAM: ${req.body.Exam}</li>
            <li>SUBJECTS: ${req.body.Stream1}</li>
            <li>BATCH: ${req.body.batch}</li>
            <li>QUALIFICATION: ${req.body.Qualification}</li>
            <li>NAME OF COLLEGE (WITH CITY): ${req.body.NameOfCollage}</li>
            <li>PASSING YEAR: ${req.body.PassingYear}</li>
            <li>MARKS IN %: ${req.body.MarksIn}</li>
            </ul>
            <p>Any query about our courses visit our website </p>
            <h1>www.egradtutor.in</h1>
            <img src='cid:myImg' alt='dd' />
          </div>
        `,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.json({ status: true, respMesg: 'Update and Email Sent Successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ Message: 'Error in server updating or sending email' });
    }
  });
  

  module.exports = router;