import recipes from "../apis/recipes";
import dataBase from "../apis/dataBase";

export const fetchRecipes = (searchQuery) => async (dispatch) => {
  const response = await recipes.get("", { params: { query: searchQuery } });
  // console.log(response);
  dispatch({ type: "FETCH_RECIPES", payload: response.data.results });
};

export const addRecipeToMenu = (recipe, daySelectedID, fullMenu) => (
  dispatch
) => {
  if (fullMenu) {
    const recipeObj = {};
    const idRec = "";
    dispatch({
      type: "ADD_RECIPE",
      payload: [recipeObj, daySelectedID, idRec, fullMenu],
    });
  }
  if (!fullMenu) {
    const idRec = recipe.id;
    const recipeObj = {};
    recipeObj[idRec] = recipe;
    dispatch({
      type: "ADD_RECIPE",
      payload: [recipeObj, daySelectedID, idRec, fullMenu],
    });
  }
};

export const deleteRecipeToMenu = (dayId, currentId) => (dispatch) => {
  dispatch({ type: "DELETE_RECIPE", payload: { dayId, currentId } });
};

export const saveMenuToDB = (menu, id) => async (dispatch) => {
  const response = await dataBase.patch("/menu", { id, menu });
};

export const createProfile = (userInfo) => async (dispatch) => {
  const response = await dataBase.post("", { data: { userInfo } });
  dispatch({ type: "CREATE_PROFILE", payload: response.data });
};

export const deleteProfile = (userId) => async (dispatch) => {
  const response = await dataBase.delete("", { data: { userId } });
  dispatch({ type: "DELETE_PROFILE", payload: response.data });
};

export const fetchUser = (userName) => async (dispatch) => {
  // console.log("in");
  const response = await dataBase.get("", { data: userName });
  // console.log(response.data, "action");
  dispatch({ type: "FETCH_USER", payload: response.data });
};

export const updateProfile = (userData) => async (dispatch) => {
  const response = await dataBase.patch("/", userData);
  dispatch({ type: "UPDATE_USER", payload: response.data });
};

export const addToIgredientList = (recipe, daySelectedID, todayID) => (
  dispatch
) => {
  dispatch({ type: "ADD_ITEM", payload: { recipe, daySelectedID, todayID } });
};

export const removeFromIgredientList = (itemID) => (dispatch) => {
  dispatch({ type: "DELETE_ITEM", payload: { itemID } });
};
