import actions from "redux-form/lib/actions";

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
      const newState = { ...state };
      console.log(newState, action.payload.dayId, action.payload.currentId);
      let test = delete newState[action.payload.dayId][
        action.payload.currentId
      ];
      console.log(test);

      console.log(newState);
      return newState;
    default:
      return state;
  }
};
