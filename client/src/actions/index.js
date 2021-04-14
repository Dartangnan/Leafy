import recipes from "../apis/recipes";
import dataBase from "../apis/dataBase";

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
//currentMenu, userId

export const saveMenuToDB = () => async (dispatch) => {
  const response = await dataBase.patch("");
  console.log("in");
  console.log(response);
};

export const createProfile = (userInfo) => async (dispatch) => {
  const response = await dataBase.post("", { data: { userInfo } });
  dispatch({ type: "CREATE_PROFILE", payload: response.data });
};

export const deleteProfile = (userId) => async (dispatch) => {
  const response = await dataBase.delete("", { data: { userId } });
  dispatch({ type: "DELETE_PROFILE", payload: response.data });
};
