import React, { useState } from "react";

const CalculatorComponent = ({ onAnswerSelected }) => {
  const [value, setValue] = useState("");

  const handleButtonClick = (e) => {
    setValue(value + e.target.value);
  };

  const handleACButtonClick = () => {
    setValue("");
  };

  const handleDEButtonClick = () => {
    setValue(value.slice(0, -1));
  };

  const handleEqualButtonClick = () => {
    onAnswerSelected(value);
  };

  return (
    <div className="calculator">
      <form action="">
        <div className="display">
          <input
            type="text"
            name="calculator-display"
            value={value}
            readOnly
          />
        </div>
        <div>
          <input type="button" value="AC" onClick={handleACButtonClick} />
          <input type="button" value="DE" onClick={handleDEButtonClick} />
          <input type="button" value="." onClick={handleButtonClick} />
          <input type="button" value="/" onClick={handleButtonClick} />
        </div>
        <div>
          <input type="button" value="7" onClick={handleButtonClick} />
          <input type="button" value="8" onClick={handleButtonClick} />
          <input type="button" value="9" onClick={handleButtonClick} />
          <input type="button" value="*" onClick={handleButtonClick} />
        </div>
        <div>
          <input type="button" value="4" onClick={handleButtonClick} />
          <input type="button" value="5" onClick={handleButtonClick} />
          <input type="button" value="6" onClick={handleButtonClick} />
          <input type="button" value="+" onClick={handleButtonClick} />
        </div>
        <div>
          <input type="button" value="1" onClick={handleButtonClick} />
          <input type="button" value="2" onClick={handleButtonClick} />
          <input type="button" value="3" onClick={handleButtonClick} />
          <input type="button" value="-" onClick={handleButtonClick} />
        </div>
        <div>
          <input type="button" value="00" onClick={handleButtonClick} />
          <input type="button" value="0" onClick={handleButtonClick} />
          <input
            type="button"
            value="="
            className="equal"
            onClick={handleEqualButtonClick}
          />
        </div>
      </form>
    </div>
  );
};

export default CalculatorComponent;
