export default (state = {}, action) => {
  switch (action.type) {
    case "ADD_RECIPE":
      if (action.payload[3]) {
        // Retrieve the current date in milliseconds:
        const today = new Date();
        const date = `${today.getFullYear()}-${
          today.getMonth() + 1
        }-${today.getDate()}`;
        const dateTest = new Date(date);
        const todayMS = dateTest.valueOf();
        let currentMenu = {};
        // console.log(action.payload[3]);
        Object.keys(action.payload[3]).forEach((key) => {
          if (key >= todayMS) {
            currentMenu[key] = action.payload[3][key];
          }
        });
        return currentMenu;
      }

      const nextState = { ...state };
      if (!nextState || !nextState[action.payload[1]]) {
        console.log("INSIDE");
        nextState[action.payload[1]] = action.payload[0];
        console.log(nextState, action.payload[1]);
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
