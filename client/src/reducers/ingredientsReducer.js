export default (state = {}, action) => {
  switch (action.type) {
    case "ADD_INGR_FROM_RECIPE":
      if (action.payload.todayID > action.payload.daySelectedID) return state;
      if (!action.payload.recipe) return state;
      action.payload.recipe.extendedIngredients.forEach((ingredient, index) => {
        console.log(index);
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
      console.log(state);
      return { ...state };

    case "DELETE_INGR_FROM_RECIPE":
      console.log(action.payload.recipe);
      action.payload.recipe.extendedIngredients.forEach((ingredient) => {
        if (!state[ingredient.id]) return;
        if (state[ingredient.id].amount === ingredient.measures.us.amount) {
          delete state[ingredient.id];
          return;
        }
        state[ingredient.id].amount -= ingredient.measures.us.amount;
      });
      return { ...state };
    case "ADD_ITEM":
      state[action.payload.item] = {
        name: action.payload.item,
        amount: "",
        units: "",
      };
      return { ...state };
    case "DELETE_ITEM":
      delete state[action.payload.item];
      return { ...state };
    case "DELETE_INGREDIENTS":
      return "";
    case "INITIAL_INGREDIENTS":
      return { ...action.payload };
    default:
      return state;
  }
};
