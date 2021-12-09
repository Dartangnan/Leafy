export default (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      console.log(action.payload, "inside-reducer");
      if (!action.payload) return false;
      return action.payload;
    default:
      return state;
  }
};
