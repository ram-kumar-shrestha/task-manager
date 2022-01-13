import { useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import { Button, Title, Input, Alert } from "../";
import { fetchUser, updateUser, deleteUser } from "../../store/actions/";

import "./profile.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ user, fetchUser, updateUser, deleteUser }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  //from
  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      setLoading(true);
      updateUser(values)
        .then(() => {
          setLoading(false);
          setInfo(
            <Alert styleName="success" message="Profile updated successfully" />
          );
        })
        .catch((e) => {
          setLoading(false);
          setInfo(
            <Alert styleName="failure" message="User credentials don't match" />
          );
        });
    },
    validate: (values) => {
      let errors = {};

      // validating name
      if (!values.name) {
        errors.name = "Required!";
      } else if (!/^[a-z ,.'-]+$/i.test(values.name)) {
        errors.name = "Name should be only words with letter";
      }

      // validating email
      if (!values.email) {
        errors.email = "Required!";
      } else if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
          values.email
        )
      ) {
        errors.email = "Invalid email format!";
      }
      return errors;
    },
  });

  //delete handler
  const onDeleteClickHandler = () => {
    confirmAlert({
      title: "Delete Account??",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteUser().then(() => {
              navigate("/");
            });
          },
        },
        {
          label: "No",
          onClick: () => navigate("/welcome/profile"),
        },
      ],
    });
  };

  return (
    <section className="profile-container">
      <Title titleName="Profile" />
      {info}
      <form onSubmit={formik.handleSubmit}>
        <Input type="text" name="Name" id="name" formik={formik} />
        <Input type="text" name="Email" id="email" formik={formik} />
        <Input type="password" name="Password" id="password" formik={formik} />

        <Button btnName="Update Profile" loading={loading} />
      </form>
      <div className="delete">
        <input
          type="button"
          name="delete"
          value="Delete Account"
          id="btn-delete"
          onClick={onDeleteClickHandler}
        />
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.users,
  };
};
export default connect(mapStateToProps, { fetchUser, updateUser, deleteUser })(
  Profile
);
