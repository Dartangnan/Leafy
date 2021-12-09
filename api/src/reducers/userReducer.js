export default (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      console.log(action.payload, "inside-reducer");
      if (!action.payload) return false;
      return action.payload;
    case "FETCH_USER":
      return { ...action.payload };
    case "UPDATE_USER":
      return { ...state, ...action.payload };
    case "LOG_OUT":
      return false;
    case "CREATE_PROFILE":
      console.log(action.payload, "REDUCER");
      return { ...action.payload };
    default:
      return state;
  }
};
