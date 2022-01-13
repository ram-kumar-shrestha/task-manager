import api from "../../api/";

import authHeader from "../../services/authHeader";

export const login = (user) => async (dispatch, getState) => {
  try {
    const response = await api.post("/users/login", user);

    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("isAuth", true);

    dispatch({ type: "LOG_IN", payload: response.data });
  } catch (error) {
    throw new Error(error);
  }
};

//logout
export const logout = () => async (dispatch) => {
  try {
    const response = await api.post("/users/logout", null, {
      headers: authHeader(),
    });

    if (response.status === 200) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("isAuth");
    } //only remove token when user is logged out

    dispatch({
      type: "LOG_OUT",
      payload: "",
    });
  } catch (error) {
    console.log(error);
  }
};
