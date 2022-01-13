export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return action.payload;

    case "FETCH_USER":
      return action.payload;

    case "UPDATE_USER":
      return action.payload;

    default:
      return state;
  }
};
