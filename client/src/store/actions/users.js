import api from "../../api/";

import authHeader from "../../services/authHeader";

// create a user
export const createUser = (user) => async (dispatch, getState) => {
  try {
    const response = await api.post("/users", user);

    dispatch({ type: "CREATE_USER", payload: response.data });
  } catch (error) {
    throw new Error(error);
  }
};

// fetch a user
export const fetchUser = () => async (dispatch, getState) => {
  try {
    const users = await api.get(`/users/me`, {
      headers: authHeader(),
    });

    dispatch({ type: "FETCH_USER", payload: users.data });
  } catch (error) {
    console.log(error);
  }
};

// update a user
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    const response = await api.patch(`/users/me`, user, {
      headers: authHeader(),
    });

    dispatch({ type: "UPDATE_USER", payload: response.data });
  } catch (error) {
    throw new Error(error);
  }
};

// delete a user
export const deleteUser = () => async (dispatch, getState) => {
  try {
    const users = await api.delete(`/users/me`, {
      headers: authHeader(),
    });

    dispatch({ type: "DELETE_USER", payload: users.data });
  } catch (error) {
    console.log(error);
  }
};
