import { combineReducers } from "redux";

import { usersReducer } from "./usersReducer";
import { authReducer } from "./authReducer";
import { tasksReducer } from "./tasksReducer";

export default combineReducers({
  users: usersReducer,
  tasks: tasksReducer,
  auth: authReducer,
});
