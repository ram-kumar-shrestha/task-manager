import { Link } from "react-router-dom";
import { Navigation, Title, BgWrapper } from "../../components";
import "./home.css";

const Home = () => {
  return (
    <>
      <BgWrapper />
      <section className="home-page__container">
        <Navigation
          links={[
            { name: "Task Manager", to: "/", id: "left-nav" },
            { name: "Log In", to: "/user/login" },
            { name: "Sign Up", to: "/user/signup" },
          ]}
        />

        <main>
          <section className="highlight-container">
            <div className="highlight">
              <Title titleName="Task Manager" style={{ color: "#000" }} />
              <p>
                <strong>Manage Your Task</strong> <br />
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "#111" }}
                >
                  Create an account to start managing your task
                </Link>
              </p>
            </div>
          </section>
        </main>
      </section>
    </>
  );
};

export default Home;
