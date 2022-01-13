import { Navigation } from "../components";

const page = {
  height: "100vh",
  display: "grid",
  placeItems: "center",
};
const form = {
  width: "60%",
  background:
    "linear-gradient( 99.96deg, rgba(255, 255, 255, 0.1) 2.12%, rgba(255, 254, 254, 0) 98.19%)",
  boxShadow: "-5px 5px 25px rgb(45 164 241)",
  borderRadius: "15px",
  overflow: " hidden",
  borderTop: "1px solid rgba(255, 255, 255, 0.5)",
  borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
  backdropFilter: "blur(5px)",
  padding: "2rem",
};

const Form = (props) => {
  return (
    <>
      <Navigation
        links={[
          { name: "Task Manager", to: "/" },
          { name: "Log In", to: "/user/login" },
          { name: "Sign Up", to: "/user/signup" },
        ]}
      />
      <section className="page" style={page}>
        <form
          className="form"
          style={form}
          onSubmit={props.formik.handleSubmit}
        >
          {props.children}
        </form>
      </section>
    </>
  );
};

export default Form;
