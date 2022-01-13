import { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Alert, InputButton, Title } from "..";
import { deleteTask, fetchTasks, updateTask } from "../../store/actions";
import "./task.css";

const Task = (props) => {
  const { tasks, fetchTasks, updateTask, deleteTask } = props;

  const [isReRender, setIsReRender] = useState(false);
  const [info, setInfo] = useState(
    <Alert styleName="success" message="Loading..." />
  );

  useEffect(() => {
    fetchTasks().then(
      () =>
        //only loading all the tasks in main task welcome page
        !window.location.href.includes("/welcome/profile") &&
        setInfo(<Alert styleName="success" message="No Tasks Left" />)
    );
  }, [isReRender]);

  // updating task
  const onCompleteClickHandler = (id, dbCompleted) => {
    updateTask(id, { completed: !dbCompleted }).then(() =>
      setIsReRender(!isReRender)
    );
  };

  //deleteling task
  const onDeleteClickHandler = (id) => {
    deleteTask(id).then(() => {
      setIsReRender(!isReRender);
    });
    // console.log(id);
  };

  const renderTasks =
    tasks.length === 0
      ? info //show loading or no tasks info
      : tasks.map((task) => {
          const isCompleteId = task.completed ? "completed" : "";

          return (
            <div className="task" key={task._id}>
              <div className="description" id={isCompleteId}>
                {task.description}
              </div>
              <InputButton
                name="task"
                value="Complete"
                className="btn-task"
                id="btn-complete"
                onClickHandler={() =>
                  onCompleteClickHandler(task._id, task.completed)
                }
              />
              <InputButton
                name="delete"
                value="Delete"
                className="btn-task"
                id="btn-delete"
                onClickHandler={() => onDeleteClickHandler(task._id)}
              />
            </div>
          );
        });

  return (
    <>
      <br />
      <Title titleName="Your tasks" />
      {renderTasks}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  };
};

export default connect(mapStateToProps, { fetchTasks, updateTask, deleteTask })(
  Task
);
