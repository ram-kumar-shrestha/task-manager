import React, { useState } from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";

import { Button, Form, Input, Title, BgWrapper, Alert } from "../../components";
import { createUser } from "../../store/actions";

const Signup = ({ createUser, error, resetUsersData }) => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      //setTimeout is used to fix
      //Cannot update a component (`Connect(Signup)`) while rendering a different component (`Signup`)

      setTimeout(setLoading(true), 0); //starting spinner

      createUser(values)
        .then(() => {
          setTimeout(setLoading(false), 0); //stoping spinner

          setTimeout(
            setInfo(
              <Alert
                styleName="success"
                message="Account Created Successfully"
              />
            ),
            0
          );
        })
        .catch((err) => {
          setTimeout(setLoading(false), 0); //stoping spinner

          setTimeout(
            setInfo(
              <Alert styleName="failure" message="Email already exists" />
            ),
            0
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

      //validating passwords
      if (!values.password) {
        errors.password = "Required!";
      } else if (
        !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)
      ) {
        errors.password =
          "Password must be at least 8 characters long and should contain at least 1 letter and 1 number";
      }

      return errors;
    },
  });

  return (
    <>
      <BgWrapper />

      <section className="signup-page__container">
        <Form formik={formik}>
          <Title titleName="Sign Up" />
          {info}

          <Input type="text" name="Name" id="name" formik={formik} />
          <Input type="email" name="Email" id="email" formik={formik} />
          <Input
            type="password"
            name="Password"
            id="password"
            formik={formik}
          />
          <Button btnName="Sign Up" loading={loading} />
        </Form>
      </section>
    </>
  );
};
const mapStateToProps = (state) => {
  // console.log(state);
  return { error: state.error };
};
export default connect(mapStateToProps, { createUser })(Signup);
