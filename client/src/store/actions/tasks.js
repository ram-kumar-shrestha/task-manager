import authHeader from "../../services/authHeader";

import api from "../../api/";

// create a task
export const createTask = (task) => async (dispatch) => {
  try {
    const response = await api.post("/tasks", task, { headers: authHeader() });
    dispatch({ type: "CREATE_TASK", paylaod: response.data });
  } catch (error) {
    throw new Error(error);
  }
};

// read all tasks
export const fetchTasks = () => async (dispatch) => {
  try {
    const response = await api.get("/tasks", { headers: authHeader() });

    dispatch({ type: "FETCH_TASKS", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

// update a task
export const updateTask = (id, task) => async (dispatch) => {
  try {
    const response = await api.patch(`/tasks/${id}`, task, {
      headers: authHeader(),
    });

    dispatch({ type: "UPDATE_TASK", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

// delete a task
export const deleteTask = (id) => async (dispatch) => {
  try {
    const response = await api.delete(`/tasks/${id}`, {
      headers: authHeader(),
    });

    dispatch({ type: "DELETE_TASK", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};
