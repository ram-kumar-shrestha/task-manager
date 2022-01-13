import React from "react";
import { Spinner } from "..";

import "./button.css";

const Button = ({
  btnName,
  loading = false,
  className = "button",
  id = "btn",
}) => {
  return (
    <button type="submit" className={className} id={id}>
      {btnName} <Spinner loading={loading} />
    </button>
  );
};

export default Button;
