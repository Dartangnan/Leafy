export default (state = {}, action) => {
  switch (action.type) {
    case "ADD_RECIPE":
      const nextState = { ...state };
      if (!nextState || !nextState[action.payload[1]]) {
        nextState[action.payload[1]] = action.payload[0];
        return nextState;
      } else {
        nextState[action.payload[1]] = {
          ...nextState[action.payload[1]],
          ...action.payload[0],
        };
        return nextState;
      }

    case "DELETE_RECIPE":
      return state;
    default:
      return state;
  }
};
