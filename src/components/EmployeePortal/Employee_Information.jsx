import React, { useState, useEffect } from 'react';
import { Label } from 'recharts';

const Employee_Information = () => {
  const [step, setStep] = useState(1);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [motherName,setMotherName] = useState('');
  const [fatherName,setFatherName] = useState('');
  const [dateOfBirth,setDateOfBirth] = useState('');
  const [genderOptions, setGenderOptions] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');
  const [relationshipStatus,setRelationshipStatus]= useState([]);
  const [selectedrelationshipStatus, setSelectedRelationshipStatus] = useState('');
  const [motherTongue,setMotherTongue]= useState([]);
  const [bloodGroup,setBloodGroup]= useState([]);
  const [emailid, setEmailid] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [presentAddress,setPresentAddress] = useState('');
  const [employeeName,setEmployeeName] = useState('');
  const [bankRecordName,setBankRecordName] = useState('');
  const [bankName,setBankName] = useState('');
  const [accontNo,setAccontNo] = useState('');
  const [ifscCode,setIfscCode] = useState('');
  const [branchName,setBranchName] = useState('');
  const [accountType,setAccountType] = useState('');
  const [conformAccountNo,setConformAccountNo] = useState('');
  const [relocateOption, setRelocateOption] = useState('');
  const [date,setDate] = useState('');
  const {place,setPlace} =useState('');
  const [signatureImage, setSignatureImage] = useState(null);
  const {gateyear,setGateyear} =useState('');
  const {eseyear,setEseyear} =useState('');
  const {psuyear,setPsuYear} =useState('');
  const {anyOtheryear,setAnyOtheryear} =useState('');
  const[gateRank,setGateRank]=useState('');
  const[eseRank,setEseRank]=useState('');
  const[psuRank,setPsuRank]=useState('');
  const[anyOtherRank,setAnyOtherRank]=useState('');
  useEffect(() => {
    // Fetch gender options from the database
    fetch('http://localhost:5001/Employee_info/getGenderOptions')
      .then((response) => response.json())
      .then((data) => setGenderOptions(data))
      .catch((error) => console.error('Error fetching gender options:', error));
  }, []);

  useEffect(() => {
    // Fetch gender options from the database
    fetch('http://localhost:5001/Employee_info/getRelationshipStatus')
      .then((response) => response.json())
      .then((data) => setRelationshipStatus(data))
      .catch((error) => console.error('Error fetching gender options:', error));
  }, []);

  const [languages, setLanguages] = useState([{ language: '', reading: false, writing: false, communicating: false }]);

  const handleInputChange = (index, field, value) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index][field] = value;
    setLanguages(updatedLanguages);
  };

  const handleAddLanguage = () => {
    setLanguages([...languages, { language: '', reading: false, writing: false, communicating: false }]);
  };
  const handleDeleteLanguage = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    setLanguages(updatedLanguages);
  };

  const [AcademicDetails, setAcademicDetails] = useState([{SchoolDegree: '', SchoolCollegeName: '', Year: '', Percentage: '' }]);

  const handleDeleteAcademicDetails = (index) => {
    const updatedAcademicDetails = [...AcademicDetails];
    updatedAcademicDetails.splice(index, 1);
    setAcademicDetails(updatedAcademicDetails);
  };

  const handleAddAcademicDetails = () => {
    setAcademicDetails([...AcademicDetails, { SchoolDegree: '', SchoolCollegeName: '', Year: '', Percentage: '' }]);
  };


  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === 1) {
      // Handle step 1 logic
      // Validate and process data if needed
      setStep(2); // Move to step 2
    } else if (step === 2) {
      // Handle step 2 logic
      // Validate and process data if needed
      setStep(3); // Move to step 3
    } else if (step === 3) {
      // Handle step 3 logic
      // Validate and process data if needed
      setStep(4); // Move to step 4
    }
    else if (step === 4) {
      // Handle step 3 logic
      // Validate and process data if needed
      setStep(5); // Move to step 4
    } else if (step === 5) {
      // Handle step 4 logic
      // Validate and process data if needed
      // Submit the form or perform final actions
      console.log('Form submitted:', {
        login,
        password,
        firstName,
        lastName,
        motherName,
        fatherName,
        dateOfBirth,
        gender: selectedGender,
        relationshipStatus: selectedrelationshipStatus,
        motherTongue,
        bloodGroup,
        languages,
        AcademicDetails,
      });
    }
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };
  return (
    <div>
      <h1>Employee information - Step {step}</h1>
     
      <form onSubmit={handleSubmit}>  
        {step === 1 && (
          <>
        <div>
          <label htmlFor="login">Employee Login MailId</label>
          <input
            type="text"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Employee Login password</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
          <div> 
            <h2>Basic Details</h2>
          <div>
          <label htmlFor="firstName">FIRST NAME:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">LAST NAME:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="MotherName">MOTHER's NAME:</label>
          <input
            type="text"
            id="motherName"
            value={motherName}
            onChange={(e) => setMotherName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="FatherName">FATHER's NAME:</label>
          <input
            type="text"
            id="fatherName"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="DateOfBirth">DATE OF BIRTH:</label>
          <input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        <div>
            <label>GENDER:</label>
            {genderOptions.map((option) => (
              <div key={option.empGenderId}>
                <input
                  type="radio"
                  id={option.empGenderId}
                  name="gender"
                  value={option.Gender}
                  checked={selectedGender === option.Gander}
                  onChange={() => setSelectedGender(option.Gander)}
                />
                <label htmlFor={option.empGenderId}>{option.Gander}</label>
              </div>
            ))}
          </div>
          <div>
            <label>RELATIONSHIP STATUS</label>
            {relationshipStatus.map((option) => (
              <div key={option.empRSId}>
                <input
                  type="radio"
                  id={option.empRSId}
                  name="gender"
                  value={option.RelationshipStatus}
                  checked={selectedrelationshipStatus === option.RelationshipStatus}
                  onChange={() => setSelectedRelationshipStatus(option.RelationshipStatus)}
                />
                <label htmlFor={option.empRSId}>{option.RelationshipStatus}</label>
              </div>
            ))}
          </div>
          <div>
          <label htmlFor="MotherTongue">MOTHER TONGUE:</label>
          <input
            type="text"
            id="MotherTongue"
            value={motherTongue}
            onChange={(e) => setMotherTongue(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="BloodGroop">BLOOD GROUP:</label>
          <input
            type="text"
            id="bloodGroup"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            required
          />
        </div>

<div>  
<label> Language: </label>
<label> Reading:</label>
<label> Writing:</label>
<label>Communicating:</label>
  {languages.map((language, index) => (
          <div key={index}>
              <input
                type="text"
                value={language.language}
                onChange={(e) => handleInputChange(index, 'language', e.target.value)}
              />
              <input
                type="checkbox"
                checked={language.reading}
                onChange={(e) => handleInputChange(index, 'reading', e.target.checked)}
              />
              <input
                type="checkbox"
                checked={language.writing}
                onChange={(e) => handleInputChange(index, 'writing', e.target.checked)}
              />
              <input
                type="checkbox"
                checked={language.communicating}
                onChange={(e) => handleInputChange(index, 'communicating', e.target.checked)}
              />
            {languages.length > 1 && (
              <button type="button" onClick={() => handleDeleteLanguage(index)}>
                Delete
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddLanguage}>
          Add
        </button>
        </div>
        </div>
            <button type="button" onClick={handleNextStep}>
              Next
            </button>
          </>
        )}
        {step === 2 && (
          <>
          <div>
<h2>Contatct Details</h2>
<div>
          <label htmlFor="emailid">EMAILID:</label>
          <input
            type="text"
            id="emailid"
            value={emailid}
            onChange={(e) => setEmailid(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contactNo">MOBILE NO/WHATSAPP NO:</label>
          <input
            type="text"
            id="contactNo"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="presentAddress">PRESENT ADDRESS:</label>
          <input
            type="textaria"
            id="presentAddress"
            value={presentAddress}
            onChange={(e) => setPresentAddress(e.target.value)}
            required
          />
        </div>
        <label>Are you willing to relocate?</label>
            <div>
              <input
                type="checkbox"
                id="relocateYes"
                value="Yes"
                checked={relocateOption === 'Yes'}
                onChange={() => setRelocateOption('Yes')}
              />
              <label htmlFor="relocateYes">Yes</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="relocateNo"
                value="No"
                checked={relocateOption === 'No'}
                onChange={() => setRelocateOption('No')}
              />
              <label htmlFor="relocateNo">No</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="relocateNA"
                value="N/A"
                checked={relocateOption === 'N/A'}
                onChange={() => setRelocateOption('N/A')}
              />
              <label htmlFor="relocateNA">N/A</label>
            </div>

          </div>
          <button type="button" onClick={handlePreviousStep}>
              Previous
            </button>
            <button type="button" onClick={handleNextStep}>
              Next
            </button>
           
          </>
        )}
        {step === 3 && (
          <>
            <div>
              <h2>Bank Details(Finance Section)</h2>
              <div>
          <label htmlFor="EmployeeName">NAME OF THE EMPLOYEE</label>
          <input
            type="text"
            id="EmployeeName"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="BankRecordName">NAME AS PER BANK RECORDS </label>
          <input
            type="text"
            id="BankRecordName"
            value={bankRecordName}
            onChange={(e) => setBankRecordName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="BankName">NAME OF THE BANK </label>
          <input
            type="text"
            id="BankName"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="AccontNo">ACCOUNT NUMBER </label>
          <input
            type="text"
            id="AccontNo"
            value={accontNo}
            onChange={(e) => setAccontNo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="IfscCode">IFSC CODE </label>
          <input
            type="text"
            id="IfscCode"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="BranchName">BRANCH NAME </label>
          <input
            type="text"
            id="BranchName"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            required
          />
        </div>
        <label>TYPE OF ACCOUNT</label>
            <div>
              <input
                type="checkbox"
                id="Savings"
                value="savings"
                checked={accountType === 'SAVINGS'}
                onChange={() => setAccountType('SAVINGS')}
              />
              <label htmlFor="relocateYes">SAVINGS</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Current"
                value="current"
                checked={accountType === 'CURRENT'}
                onChange={() => setAccountType('CURRENT')}
              />
              <label htmlFor="Current">CURRENT</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Other"
                value="other"
                checked={accountType === 'OTHER'}
                onChange={() => setAccountType('OTHER')}
              />
              <label htmlFor="Other">OTHER</label>
            </div>
        <div>
          <label htmlFor="ConformAccountNo">CONFIRM ACCOUNT NUMBER</label>
          <input
            type="text"
            id="ConformAccountNo"
            value={conformAccountNo}
            onChange={(e) => setConformAccountNo(e.target.value)}
            required
          />
        </div>
            </div>
            <button type="button" onClick={handlePreviousStep}>
              Previous
            </button>
            <button type="button" onClick={handleNextStep}>
              Next
            </button>
          </>
        )}
         {step === 4 && (
          <>
            <div>
             <h2>Academic Details</h2>
             <div>  
<label> School/Degree </label>
<label> School/college Name </label>
<label>Year</label>
<label>%Percentage/CGPA</label>
  {AcademicDetails.map((AcademicDetail, index) => (
          <div key={index}>
              <input
                type="text"
                value={AcademicDetail.SchoolDegree}
                onChange={(e) => handleInputChange(index, 'SchoolDegree', e.target.value)}
              />
              <input
                type="text"
                value={AcademicDetail.SchoolCollegeName}
                onChange={(e) => handleInputChange(index, 'SchoolCollegeName', e.target.value)}
              />
              <input
                type="text"
                value={AcademicDetail.Year}
                onChange={(e) => handleInputChange(index, 'Year', e.target.value)}
              />
              <input
                type="text"
                value={AcademicDetail.Percentage}
                onChange={(e) => handleInputChange(index, 'Percentage', e.target.value)}
              />
            {AcademicDetails.length > 1 && (
              <button type="button" onClick={() =>  handleDeleteAcademicDetails(index)}>
                Delete
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddAcademicDetails}>
          Add
        </button>
        </div>
        <h2>National Entrance Exam Scores</h2>
        <p>Exam</p>
        <p>Year</p>
        <p>Rank</p>
        <div>
          <label htmlFor="Gate">GATE</label>
          <input
            type="text"
            value={gateyear}
            onChange={(e) => setGateyear(e.target.value)}
          />
           <input
            type="text"
            value={gateRank}
            onChange={(e) => setGateRank(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="Ese">ESE</label>
          <input
            type="text"
            id="Ese"
            value={eseyear}
            onChange={(e) => setEseyear(e.target.value)}
          />
          <input
            type="text"
            id="Ese"
            value={eseRank}
            onChange={(e) => setEseRank(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="Psu">PSU</label>
          <input
            type="text"
            id="Psu"
            value={psuyear}
            onChange={(e) => setPsuYear(e.target.value)}
          />
          <input
            type="text"
            id="Psu"
            value={psuRank}
            onChange={(e) => setPsuRank(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="AnyOther">AnyOther</label>
          <input
            type="text"
            id="AnyOther"
            value={anyOtheryear}
            onChange={(e) => setAnyOtheryear(e.target.value)}
          />
           <input
            type="text"
            id="AnyOther"
            value={anyOtherRank}
            onChange={(e) => setAnyOtherRank(e.target.value)}
          />
        </div>
        
            </div>
            <button type="button" onClick={handlePreviousStep}>
              Previous
            </button>
            <button type="button" onClick={handleNextStep}>
              Next
            </button>
          </>
        )}
        {step === 5 && (
          <>
            <div>
              <h2>Declaration</h2>
              <p>Thereby declare that the above-mentioned details and information are correct to the best of my 
knowledge and I bear the responsibility for the correctness of the above-mentioned particulars.</p>
<div>
          <label htmlFor="Place">PLACE</label>
          <input
            type="text"
            id="Place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="Date">DATE</label>
          <input
            type="date"
            id="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
                <label htmlFor="Signature">SIGNATURE</label>
                <input
                  type="file"
                  id="Signature"
                  onChange={(e) => setSignatureImage(e.target.files[0])}
                  accept="image/*"
                  required
                />
              </div>
          
            </div>
            <button type="button" onClick={handlePreviousStep}>
              Previous
            </button>
            <button type="submit">Submit</button>
          </>
        )}

      </form>
    </div>
  )
}

export default Employee_Information




