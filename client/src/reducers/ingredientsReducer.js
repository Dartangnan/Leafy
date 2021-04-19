export default (state = {}, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (action.payload.todayID < action.payload.daySelectedID) return state;
      action.payload.recipe.extendedIngredients.forEach((ingredient) => {
        if (Object.keys(state).includes(ingredient.id)) {
          if (
            state[action.payload.recipe.id].units ===
            ingredient.measures.us.unitShort
          ) {
            state[ingredient.id].amount += ingredient.measures.us.amount;
          }
        }
        state[ingredient.id] = {
          name: ingredient.name,
          amount: ingredient.measures.us.amount,
          units: ingredient.measures.us.unitShort,
        };
      });
      return { ...state };

    case "DELETE_ITEM":
      const newState = { ...state };
      delete state[action.payload.itemID];
      return newState;
    default:
      return state;
  }
};
