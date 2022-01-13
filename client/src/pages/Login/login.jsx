import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { Button, Form, Input, Title, BgWrapper, Alert } from "../../components";

import "./login.css";
import { login } from "../../store/actions";
import { useFormik } from "formik";

const Login = ({ login }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      // console.log(values.email);
      login(values)
        .then(() => {
          setTimeout(setLoading(false), 0); //stoping spinner

          navigate("/welcome");
        })
        .catch((e) => {
          setTimeout(setLoading(false), 0); //stoping spinner
          setTimeout(
            setInfo(
              <Alert
                styleName="failure"
                message="User credentials don't match"
              />
            ),
            0
          );
        });
    },
    validate: (values) => {
      let errors = {};

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

      //validating passwords
      if (!values.password) {
        errors.password = "Required!";
      }

      return errors;
    },
  });
  return (
    <>
      <BgWrapper />
      <section className="login-page__container">
        <Form formik={formik}>
          <Title titleName="Log In" />
          {info}

          <Input
            type="email"
            name="Email"
            id="email"
            formik={formik}
            required={true}
          />
          <Input
            type="password"
            name="Password"
            id="password"
            formik={formik}
            required={true}
          />

          <Button btnName="Log In" loading={loading} />

          <Link to="/user/signup" id="signup-link">
            Don't have an account ?
          </Link>
        </Form>
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps, { login })(Login);
