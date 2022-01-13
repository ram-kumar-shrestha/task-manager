import React from "react";

const group = {
  display: "flex",
  flexDirection: "column",
};

const input = {
  fontSize: "1rem",
  padding: "0.3em",
  outline: "none",
  borderRadius: "2px",
  border: "none",
  marginBottom: "0.5em",
};

const label = {
  color: "#dee6f3",
  fontSize: "1.2rem",
};

const error = {
  color: "#ff2052",
  fontSize: "1rem",
  marginBottom: "0.4em",
};
const Input = ({ type, name, id, formik }) => {
  const nameValue = name.toLowerCase();

  // formik.values.nameValue eqv to formik.values.'name' which is undefined
  let valueName = "";
  let errorName = "";

  switch (nameValue) {
    case "name":
      valueName = formik.values.name;
      errorName = formik.errors.name;
      break;
    case "email":
      valueName = formik.values.email;
      errorName = formik.errors.email;
      break;
    case "password":
      valueName = formik.values.password;
      errorName = formik.errors.password;
      break;
    case "completed":
      valueName = formik.values.completed;
      break;
    default:
      break;
  }

  return (
    <div className="form-group" style={group}>
      <label htmlFor={id} style={label}>
        {name} :{errorName && <div style={error}>{errorName}</div>}
      </label>
      <input
        type={type}
        name={nameValue}
        id={id}
        style={input}
        onChange={formik.handleChange}
        value={valueName}
      />
    </div>
  );
};

export default Input;
