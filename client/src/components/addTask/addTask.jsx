import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { connect } from "react-redux";
import { Alert } from "..";

import { createTask, fetchTasks } from "../../store/actions";

import "./addTask.css";

const AddTask = (props) => {
  const { createTask, fetchTasks } = props;

  const [isReRender, setIsReRender] = useState(false); //to rerender the page

  const [info, setInfo] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [isReRender]);

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    onSubmit: (values) => {
      createTask(values)
        .then(() => {
          setIsReRender(!isReRender);
          setInfo("");
        })
        .catch((e) =>
          setInfo(<Alert styleName="failure" message="Task can't be empty" />)
        );
    },
  });

  return (
    <section className="add-task__container">
      <form onSubmit={formik.handleSubmit}>
        {info}
        <input
          type="text"
          name="description"
          placeholder="Add task"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        <button type="submit" id="btn-search">
          <FaSearch />
        </button>
      </form>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  };
};
export default connect(mapStateToProps, { createTask, fetchTasks })(AddTask);
