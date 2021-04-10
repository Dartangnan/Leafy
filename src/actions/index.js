import recipes from "../apis/recipes";

export const fetchRecipes = (searchQuery) => async (dispatch) => {
  const response = await recipes.get("", { params: { query: searchQuery } });
  //   console.log(response);
  dispatch({ type: "FETCH_RECIPES", payload: response.data.results });
};
