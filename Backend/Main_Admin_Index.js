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





app.get('/TestActivation', async (req, res) => {
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
    sc.noOfQuestions
FROM
    test_creation_table AS t
LEFT JOIN course_subjects AS cs
ON
    t.courseCreationId = cs.courseCreationId
LEFT JOIN subjects AS s
ON
    s.subjectId = cs.subjectId
LEFT JOIN sections AS sc
ON
    sc.subjectId = s.subjectId    
    
WHERE
    t.testCreationTableId = 3`);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });