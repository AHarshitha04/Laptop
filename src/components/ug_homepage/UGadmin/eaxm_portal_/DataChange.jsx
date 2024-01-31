import React from "react";

const DateChange = ({ name, value, onChange }) => {
  const ref = React.useRef(null);

  const handleFocus = () => {
    if (ref.current) {
      ref.current.type = "date";
    }
  };

  const handleBlur = () => {
    if (ref.current) {
      ref.current.type = value ? "date" : "text";
    }
  };

  return (
    <input
      type={value ? "date" : "text"}
      name={name}
      className="inputss"
      onChange={onChange}
      ref={ref}
      placeholder="Enter Date"
      onFocus={handleFocus}
      onBlur={handleBlur}
      value={value}
    />
  );
};

export default DateChange;
