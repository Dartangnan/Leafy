export default (state = [], action) => {
  switch (action.type) {
    case "ADD_RECIPE":
      return [...state, action.payload];
    case "DELETE_RECIPE":
      return [...state, action.payload];
    default:
      return state;
  }
};
