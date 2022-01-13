import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  AddTask,
  InputButton,
  Navigation,
  Profile,
  Task,
  Title,
} from "../../components";
import { logout } from "../../store/actions";

import "./welcome.css";

const Welcome = (props) => {
  const navigate = useNavigate();
  const { logout } = props;
  const [isRenderProfile, setIsRenderProfile] = useState(false);

  useEffect(() => {
    // preventing loading main welcome page while reloading
    if (window.location.href.includes("/welcome/profile")) {
      setIsRenderProfile(true);
    }
  });

  const onLogOutClickHandler = (e) => {
    logout().then(() => navigate("/"));
  };

  const onProfileClickHandler = (e) => {
    setIsRenderProfile(true);
    // alert("clicked");
  };
  const onBrandClickHandler = (e) => {
    setIsRenderProfile(false);
    // alert("clicked");
  };

  const renderWelcome = isRenderProfile ? (
    <Profile />
  ) : (
    <>
      <AddTask />

      <section className="task-container">
        <Task />
      </section>
    </>
  );

  return (
    <section className="welcome-container">
      <Navigation
        links={[{ name: "Task Manager", to: "/welcome" }]}
        onClickHandler={onBrandClickHandler}
      >
        <InputButton
          name="logout"
          value="Log Out"
          className="btn-welcome__nav"
          id="btn-logout"
          onClickHandler={onLogOutClickHandler}
        />

        <Link to="/welcome/profile">
          <InputButton
            name="profile"
            value="Profile"
            className="btn-welcome__nav"
            id="btn-profile"
            onClickHandler={onProfileClickHandler}
          />
        </Link>
      </Navigation>

      <Title titleName="Welcome to task manager" id="welcome-title" />

      {renderWelcome}
    </section>
  );
};

export default connect(null, { logout })(Welcome);
