import React from "react";
import noimg from "./NoImages.jpg";

const StudentRegistrationForm = ({ 
    formData,
    onChange,
    onDisplayData,
    genders,
    categories,
    states,
    districts,
    Batchs,
    Qualifications,
    selectedGenderId,
    selectedCategoryId,
    selectedState,
    selecteddistrict,
    selectedBatch,
    selectedQualification,
    handleStateChange,
    handledistrictChange,
    handleBatchChange,
    handleQualificationChange,
    handleFileChange,
    courseData
 }) => {
   

  return (
    <div>
      <form encType="multipart/form-data">
      <section>
           <h1>Student Registration Page</h1>
           <div>
           <label htmlFor="candidateName">CANDIDATE NAME(accoding to 10th memo):</label>
             <input
              type="text"
              id="candidateName"
              name="candidateName"
              value={formData.candidateName}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="dateOfBirth">DATE OF BIRTH:</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={onChange}
            />
          </div>

          <div>
            <label>GENDER:</label>
            {genders && genders.map((gender) => (
              <div key={gender.GenderId}>
                <input
                  type="radio"
                  id={gender.GenderId}
                  name="gender"
                  value={gender.GenderId}
                  checked={parseInt(selectedGenderId) === gender.GenderId}
                  onChange={onChange}
                />
                <label htmlFor={gender.GenderId}>{gender.Gander}</label>
              </div>
            ))}
          </div>

          {/* CATEGORY: */}
          <div>
            <label>CATEGORY:</label>
            {categories && categories.map((category) => (
              <div key={category.CategoryId}>
                <input
                  type="radio"
                  id={category.CategoryId}
                  name="category"
                  value={category.CategoryId}
                  checked={parseInt(selectedCategoryId) === category.CategoryId}
                  onChange={onChange}
                />
                <label htmlFor={category.CategoryId}>{category.Category}</label>
              </div>
            ))}
          </div>
          <div>
            <label htmlFor="emailId">EMAIL ID:</label>
            <input
              type="email"
              id="emailId"
              name="emailId"
              value={formData.emailId}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="confirmEmailId">CONFIRM EMAIL ID:</label>
            <input
              type="email"
              id="confirmEmailId"
              name="confirmEmailId"
              value={formData.confirmEmailId}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="contactNo">CONTACT NO:</label>
            <input
              type="number"
              id="contactNo"
              name="contactNo"
              value={formData.contactNo}
              onChange={onChange}
            />
          </div>
        </section>
        <section>
          <h2>FATHER'S/GUARDIAN'S DETAILS</h2>
          <div>
            <label htmlFor="fatherName">FATHER'S NAME:</label>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              value={formData.fatherName}
              onChange={onChange}
            />
          </div>

          <div>
            <label htmlFor="occupation">OCCUPATION:</label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={onChange}
            />
          </div>


          <div>
            <label htmlFor="mobileNo">MOBILE NO:</label>
            <input
              type="number"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={onChange}
            />
          </div>
        </section>

        <section>
          <h2>COMMUNICATION ADDRESS</h2>
          <div>
            <label htmlFor="line1">LINE1:</label>
            <input
              type="text"
              id="line1"
              name="line1"
              value={formData.line1}
              onChange={onChange}
            />
          </div>

          <div className="inputContent">
          <h2>Select a State</h2>
      <select onChange={handleStateChange} value={selectedState}>
        <option value="" disabled>
          Choose a state
        </option>
        { states && states.map((state) => (
          <option key={state.state_id} value={state.state_id}>
            {state.name}
          </option>
        ))}
      </select>

      </div>
      <div >
{selectedState && (
        <div>
          <h2>Select a District</h2>
          <select onChange={handledistrictChange}  value={selecteddistrict} >
            <option value="" disabled>
              Choose a district
            </option>
            {districts && districts.map((district) => (
              <option key={district.districts_id } value={district.districts_id }>
                {district.districts_name}
              </option>
            ))}
          </select>
        </div>
      )}</div>

<div>
            <label htmlFor="pincode">PINCODE:</label>
            <input
              type="number"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={onChange}
            />
          </div>

        </section>
        <h2>COURSE DETAILS</h2>
        <div className="inputContent">
        {courseData && courseData.map((course) => (
  <div key={course.courseCreationId}>
    <p>EXAM: {course.examName}</p>
    <p>SESSION: {course.courseYear}</p>
    <p>COURSE: {course.courseName}</p>
    <p>SUBJECTS :{course.subjects.join(', ')}</p>
  </div>
))}

          </div>
        <section>

        <h2>BATCH</h2>
      <select onChange={handleBatchChange} value={selectedBatch}>
        <option value="" disabled>
          Choose a Batch
        </option>
        {Batchs && Batchs.map((Batch) => (
          <option key={Batch.BatchId } value={Batch.BatchId }>
            {Batch.Batch}
          </option>
        ))}
      </select> 
        </section>
<section>
  <h1>EDUCATION DETAILS</h1>

<h2>QUALIFICATION</h2>
<select onChange={handleQualificationChange} value={selectedQualification}>
<option value="" disabled>
  Choose a Qualification
</option>
{Qualifications && Qualifications.map((Qualification) => (
  <option key={Qualification.edStatusId  } value={Qualification.edStatusId  }>
    {Qualification.educationStatus}
  </option>
))}
</select> 

<div>
            <label htmlFor="NameOfCollege">NAME OF COLLEGE (WITH CITY):</label>
            <input
              type="text"
              id="NameOfCollege"
              name="NameOfCollege"
              value={formData.NameOfCollege}
              onChange={onChange}
            />
          </div>
          
<div>
            <label htmlFor="passingYear">PASSING YEAR:</label>
            <input
              type="text"
              id="passingYear"
              name="passingYear"
              value={formData.passingYear}
              onChange={onChange}
            />
          </div>


          <div>
            <label htmlFor="marks">MARKS IN %:</label>
            <input
              type="text"
              id="marks"
              name="marks"
              value={formData.marks}
              onChange={onChange}
            />
          </div>

</section>
{/* <div className="content_reg "> */}

{/* UPLOAD PHOTO  -----------*/}
           {/* <div className="imgSection">
             <h3>UPLOAD PHOTO <span>*</span> </h3>
             <img src={noimg} width={144} height={144} alt="asaS" />
             <div className="input-filde">
               <input
               required
                 type="file"
                 name="files1"
                 onChange={handleFileChange}
               /> */}
               {/* <span className="errorText">{formErrors.files1}</span> */}
             {/* </div>
           </div> */}
{/* >UPLOAD SIGNATURE   -----------*/}
           {/* <div className="imgSection">
             <h3>UPLOAD SIGNATURE  <span>*</span> </h3>
             <img src={noimg} width={144} height={144} alt="asaS" />
             <div className="input-filde">
               <input
                 type="file"
                 name="filess"
                 onChange={handleFileChange}
               /> */}
               {/* <span className="errorText">{formErrors.filess}</span> */}
             {/* </div>
           </div> */}
{/* UPLOAD ID PROOF   -----------*/}
           {/* <div className="imgSection">
             <h3>UPLOAD ID PROOF  <span>*</span> </h3>
             <img src={noimg} width={144} height={144} alt="asaS" />
             <div className="input-filde">
               <input
                 type="file"
                 name="filess3"
                 onChange={handleFileChange}
               /> */}
               {/* <span className="errorText">{formErrors.filess3}</span> */}
             {/* </div>
           </div> 
         </div>
<section> */}
{/* </section> */}
        <div>
          <button type="button" onClick={onDisplayData}>
            Preview Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentRegistrationForm;
