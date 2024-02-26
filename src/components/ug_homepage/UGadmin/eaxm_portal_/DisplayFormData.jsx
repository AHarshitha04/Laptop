// DisplayFormData.jsx

import React from "react";

const DisplayFormData = ({ formData, onSubmit, onBack }) => {
  return (
    <div>
     
      <h1>Entered Data</h1>
      <pre>{JSON.stringify(formData, null, 2)}</pre>

      {/* Buttons to submit or go back */}
      <button onClick={onSubmit}>Submit</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default DisplayFormData;
