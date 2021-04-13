import recipes from "../apis/recipes";

export const fetchRecipes = (searchQuery) => async (dispatch) => {
  const response = await recipes.get("", { params: { query: searchQuery } });
  // console.log(response);
  dispatch({ type: "FETCH_RECIPES", payload: response.data.results });
};

export const addRecipeToMenu = (recipe, daySelectedID) => (dispatch) => {
  const idRec = recipe.id;
  const recipeObj = {};
  recipeObj[idRec] = recipe;
  // console.log(recipeObj);
  dispatch({ type: "ADD_RECIPE", payload: [recipeObj, daySelectedID, idRec] });
};

export const deleteRecipeToMenu = (dayId, currentId) => (dispatch) => {
  dispatch({ type: "DELETE_RECIPE", payload: { dayId, currentId } });
};
