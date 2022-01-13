import React from "react";
import "./title.css";

const Title = ({ titleName, id = "title" }) => {
  return (
    <h1 className="title" id={id}>
      {titleName}
    </h1>
  );
};

export default Title;
