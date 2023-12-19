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
const ImeageUpload = require('./mainWebsitAdmin/ImeageUpload')
const db1 = require('./db1');
const db2=require('./db2');
const Dashboard = require('./otsadmin/Dashboard')
const ExamCreation = require('./otsadmin/ExamCreation')
const courseCreation = require('./otsadmin/CoureseCreation')
const InstructionCreation = require('./otsadmin/InstructionCreation')
const TestCreation = require('./otsadmin/TestCreation')
const DocumentUpload =require('./otsadmin/DocumentUpload')
app.use(cors({ origin: "*" }));

app.use('/ImeageUpload', ImeageUpload)

//OTS Admin

app.use('/Dashboard', Dashboard)
app.use('/ExamCreation', ExamCreation)
app.use('/courseCreation' , courseCreation)
app.use('/InstructionCreation',InstructionCreation)
app.use('/TestCreation',TestCreation)
app.use('/DocumentUpload',DocumentUpload)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });