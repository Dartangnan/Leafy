import recipes from "../apis/recipes";

export const fetchRecipes = (searchQuery) => async (dispatch) => {
  const response = await recipes.get("", { params: { query: searchQuery } });
  console.log(response);
  dispatch({ type: "FETCH_RECIPES", payload: response.data.results });
};

export const addRecipeToMenu = (recipe) => (dispatch) => {
  dispatch({ type: "ADD_RECIPE", payload: recipe });
};

export const deleteRecipeToMenu = (recipe) => (dispatch) => {
  dispatch({ type: "DELETE_RECIPE", payload: recipe });
};
