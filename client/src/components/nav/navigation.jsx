import { Link } from "react-router-dom";

import "./nav.css";

const Navigation = (props) => {
  const { links, onClickHandler = "" } = props;
  //onClickHandler is used only to set the profile render false
  const navlinks = links.map((link, index) => {
    return (
      <Link to={link.to} className="link" key={index} onClick={onClickHandler}>
        {link.name}
      </Link>
    );
  });

  return (
    <nav className="navigation">
      {navlinks}
      {props.children && props.children}{" "}
      {/*if there are children render children*/}
    </nav>
  );
};

export default Navigation;
