const express = require("express");
const router = express.Router();
const db= require("../databases/db2");
const multer = require("multer");
const cors = require("cors");
const nodemailer = require('nodemailer');
const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
      //callback(null, "public/images");
      callback(null, "../public");
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

  router.post("/student", uploads.fields([
    { name: "files1", maxCount: 1 },
    { name: "filess", maxCount: 1 },
    { name: 'filess3', maxCount: 1 }
  ]), async (req, res) => {
    try {
      const {
        CandidateName,
        DataOfBirth,
        Gender,
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
  
      const filename1 = files.files1[0].filename;
      const filename2 = files.filess[0].filename;
      const filename3 = files.filess3[0].filename;
  
      console.log(files);
  
      const sql = "INSERT INTO studentdat SET ?";
      const values = {
        CandidateName,
        DataOfBirth,
        Gender,
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
        UplodadPhto: filename1,
        Signature: filename2,
        Proof: filename3,
      };
      await db.queryAsync(sql, values);
     

      

   // Sending email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com', // Corrected host
      auth: {
        user: 'webdriveegate@gmail.com',
        pass: 'qftimcrkpkbjugav'
      }
    });

    const mailOptions = {
      from: 'webdriveegate@gmail.com',// sender address
      to:[ req.body.EmailId, 'sravankumarkurumelli@gmail.com', 'sravan.k@egradtutor.in'], // list of receivers
      subject: req.body.EmailId, // Subject line
      text:req.body.CandidateName,
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

        <p>Any query aobut our courses visit our website </p>
        <h1>www.egradtutor.in</h1>

      <img src='cid:myImg' alt='dd' />
      </ul>
      `
  };
  await sendMail(mailOptions);
  return res.status(200).json({ success: true, message: "Record inserted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error in database operation" });
    }
  });
  
const sendMail = (options) => {
    return new Promise((resolve, reject) => {
      transporter.sendMail(options, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  };
  
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