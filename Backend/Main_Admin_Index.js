const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5001;
// app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const path = require('path');
const imagesDirectory = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(imagesDirectory));
const ughomepage_banner_login = require('./mainWebsitAdmin/ughomepage_banner_login')
const db = require('./databases/db2');

const http = require("http");
const socketIO = require("socket.io");

 const server = http.createServer(app);
 const io = socketIO(server);
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
const StudentRegistationPage = require('./quiz_ots/StudentRegistationPage')

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
app.use('/StudentRegistationPage',StudentRegistationPage)

//-------------------- empolyee portal  -------------------------------------
const Employee_info=require('./EMPLOYEE_PORTAL/Employee_Info')
app.use("/Empoyee_protal", Empoyee_protal);
app.use("/Employee_info", Employee_info);


//----------------------------------------------------Student Dashbord-------------------------------------------------------

const BuyCourses =require('./StudentDashboard/BuyCourses')
const Doubtsection = require("./StudentDashboard/Doubtsection");


app.use("/BuyCourses", BuyCourses);
app.use("/Doubtsection", Doubtsection);

app.get('/buynow', (req, res) => {
 /// if student already exist with that email 
  //insert data into database for student student 
  //transation id generation dataetimesec into table aginst student id and test id,actualprice ,
   // const {email,firstname,phone}=getstudentdetails(student id)
  //payintergarete(res,txnid,amount,email,productinfo,firstname,phone,"",'','','','',surl,furl)
  // const { txnid, amount, productinfo, firstname, email, phone } = req.body;
  
});

function getstudentdetails(studentid){
  //select * from student where student id
  //return object 

}

function payUintegrate(res,txnid,amount,email,productinfo,firstname,phone,udf1,udf2,udf3,udf4,udf5,surl,furl){
 
  const YOUR_MERCHANT_SALT = 'cZpZ0nxjmFYG3p5bZ0odsbtdGhpZlyWx';
  const YOUR_MERCHANT_KEY = '3LtnTS';
 

  const hashString = (
    YOUR_MERCHANT_KEY +
    "|" +
    txnid +
    "|" +
    amount +
    "|" +
    productinfo +
    "|" +
    firstname +
    "|" +
    email +
    "|" +
    udf1 +
    "|" +
    udf2 +
    "|" +
    udf3 +
    "|" +
    udf4 +
    "|" +
    udf5 +
    "||||||" +
    YOUR_MERCHANT_SALT
  );
  // Use the jsSHA library to generate the hash
  const sha = new jsSHA('SHA-512', 'TEXT');
  sha.update(hashString);
  const hash = sha.getHash('HEX');



  // Render the PayU form
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>PayU Form</title>
      </head>
      <body onload="document.payuform.submit()">
        <form action="https://test.payu.in/_payment" method="post" name="payuform">
          <input type="hidden" name="key" value="${YOUR_MERCHANT_KEY}">
          <input type="hidden" name="txnid" value="${txnid}">
          <input type="hidden" name="amount" value="${amount}">
          <input type="hidden" name="productinfo" value="${productinfo}">
          <input type="hidden" name="firstname" value="${firstname}">
          <input type="hidden" name="email" value="${email}">
          <input type="hidden" name="phone" value="${phone}">
          <input type="hidden" name="surl" value="${surl}">
          <input type="hidden" name="furl" value="${furl}">
          <input type="hidden" name="hash" value="${hash}">
          <input type="submit" value="Submit">
        </form>
      </body>
    </html>
  `);
}

app.get('/TestActivation/:testCreationTableId', async (req, res) => {
  const { testCreationTableId } = req.params;

  // Fetch subjects
  try {
    const [rows] = await db.query(`SELECT
    t.testCreationTableId,
    t.TestName,
    t.TotalQuestions,
    s.subjectId,
    s.subjectName,
    sc.sectionId,
    sc.sectionName,
    sc.noOfQuestions,
    subquery2.numberOfQuestionsInSection,
    subquery.numberOfQuestionsInSubject,
    MAX(ts.status) AS status
FROM
    test_creation_table AS t
LEFT JOIN course_subjects AS cs ON t.courseCreationId = cs.courseCreationId
LEFT JOIN subjects AS s ON s.subjectId = cs.subjectId
LEFT JOIN sections AS sc ON t.testCreationTableId = sc.testCreationTableId AND sc.subjectId = s.subjectId
LEFT JOIN test_states AS ts ON t.testCreationTableId = ts.testCreationTableId
LEFT JOIN (
    SELECT
        q.testCreationTableId,
        q.subjectId,
        COUNT(q.question_id) AS numberOfQuestionsInSubject
    FROM
        questions AS q
    GROUP BY
        q.testCreationTableId,
        q.subjectId
) AS subquery ON t.testCreationTableId = subquery.testCreationTableId AND s.subjectId = subquery.subjectId
LEFT JOIN (
    SELECT
        q.testCreationTableId,
        q.sectionId,
        COUNT(q.question_id) AS numberOfQuestionsInSection
    FROM
        questions AS q
    GROUP BY
        q.testCreationTableId,
        q.sectionId
) AS subquery2 ON t.testCreationTableId = subquery2.testCreationTableId AND sc.sectionId = subquery2.sectionId
GROUP BY
    t.testCreationTableId,
    t.TestName,
    t.TotalQuestions,
    s.subjectId,
    s.subjectName,
    sc.sectionId,
    sc.sectionName,
    sc.noOfQuestions,
    subquery.numberOfQuestionsInSubject,
    subquery2.numberOfQuestionsInSection;
`, [testCreationTableId]);

    // Initialize the tests array
    const tests = [];

    // Process the rows and organize the data
    rows.forEach(row => {
      const existingTest = tests.find(test => test.testCreationTableId === row.testCreationTableId);
      if (existingTest) {
        // Test already exists, add subject and section to existing test
        const existingSubject = existingTest.subjects.find(subject => subject.subjectId === row.subjectId);
        if (existingSubject) {
          // Subject already exists, add section to existing subject
          existingSubject.sections.push({
            status:row.status,
            sectionId: row.sectionId,
            sectionName: row.sectionName,
            numberOfQuestionsInSection:row.numberOfQuestionsInSection,
            numberOfQuestions: row.noOfQuestions,
          });
        } else {
          // Subject does not exist, create a new subject
          existingTest.subjects.push({
            status:row.status,
            subjectId: row.subjectId,
            subjectName: row.subjectName,
            numberOfQuestionsInSubject:row.numberOfQuestionsInSubject,
            sections: [{
              sectionId: row.sectionId,
              sectionName: row.sectionName,
              numberOfQuestionsInSection:row.numberOfQuestionsInSection,
              numberOfQuestions: row.noOfQuestions,
            }],
          });
        }
      } else {
        // Test does not exist, create a new test with subject and section
        tests.push({
          status:row.status,
          testCreationTableId: row.testCreationTableId,
          TestName: row.TestName,
          TotalQuestions: row.TotalQuestions,
          subjects: [{
            subjectId: row.subjectId,
            subjectName: row.subjectName,
            numberOfQuestionsInSubject:row.numberOfQuestionsInSubject,
            sections: [{
              sectionId: row.sectionId,
              sectionName: row.sectionName,
              numberOfQuestionsInSection:row.numberOfQuestionsInSection,
              numberOfQuestions: row.noOfQuestions,
            }],
          }],
        });
      }
    });

    res.json(tests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new endpoint for updating test activation status
app.post('/updateTestActivationStatus/:testCreationTableId', async (req, res) => {
  const { testCreationTableId } = req.params;
  const { status } = req.body;

  try {
    // Assuming you have a 'test_states' table with columns 'teststatesId', 'status', and 'testCreationTableId'
    await db.query('INSERT INTO test_states (status, testCreationTableId) VALUES (?, ?) ON DUPLICATE KEY UPDATE status = ?', [status, testCreationTableId, status]);

    res.json({ success: true, message: 'Activation state updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






// SELECT
//     t.testCreationTableId,
//     t.TestName,
//     t.TotalQuestions,
//     s.subjectId,
//     s.subjectName,
//     sc.sectionId,
//     sc.sectionName,
//     sc.noOfQuestions,
//     subquery2.numberOfQuestionsInSection,
//     subquery.numberOfQuestionsInSubject
// FROM
//     test_creation_table AS t
// LEFT JOIN course_subjects AS cs ON t.courseCreationId = cs.courseCreationId
// LEFT JOIN subjects AS s ON s.subjectId = cs.subjectId
// LEFT JOIN sections AS sc ON sc.subjectId = s.subjectId
// LEFT JOIN (
//     SELECT
//         q.subjectId,
//         COUNT(q.question_id) AS numberOfQuestionsInSubject
//     FROM
//         questions AS q
//     GROUP BY
//         q.subjectId
// ) AS subquery ON s.subjectId = subquery.subjectId
// LEFT JOIN (
//     SELECT
//         q.sectionId,
//         COUNT(q.question_id) AS numberOfQuestionsInSection
//     FROM
//         questions AS q
//     GROUP BY
//         q.sectionId
// ) AS subquery2 ON sc.sectionId = subquery2.sectionId
// LEFT JOIN questions AS q ON t.testCreationTableId = q.testCreationTableId
//                       AND sc.sectionId = q.sectionId
//                       AND s.subjectId = q.subjectId
// WHERE
//     t.testCreationTableId = 3
// GROUP BY
//     t.testCreationTableId,
//     t.TestName,
//     t.TotalQuestions,
//     s.subjectId,
//     s.subjectName,
//     sc.sectionId,
//     sc.sectionName,
//     sc.noOfQuestions,
//     subquery.numberOfQuestionsInSubject,
//     subquery2.numberOfQuestionsInSection;


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });