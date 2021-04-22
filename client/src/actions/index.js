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
    console.log(recipe, daySelectedID);
    const idRec = recipe.id;
    const recipeObj = {};
    recipeObj[idRec] = recipe;
    console.log("-------", recipeObj, daySelectedID, idRec, fullMenu);
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

export const updateProfile = (userData) => async (dispatch) => {
  const response = await dataBase.patch("/", userData);
  dispatch({ type: "UPDATE_USER", payload: response.data });
};

export const addToIgredientList = (recipe, daySelectedID, todayID) => (
  dispatch
) => {
  dispatch({
    type: "ADD_INGR_FROM_RECIPE",
    payload: { recipe, daySelectedID, todayID },
  });
};

export const removeFromIgredientList = (recipe) => (dispatch) => {
  dispatch({ type: "DELETE_INGR_FROM_RECIPE", payload: { recipe } });
};

export const addIngredient = (item) => (dispatch) => {
  dispatch({ type: "ADD_ITEM", payload: { item } });
};

export const removeIngredient = (item) => (dispatch) => {
  dispatch({ type: "DELETE_ITEM", payload: { item } });
};

export const saveIngredientList = (ingredientList, id) => async (dispatch) => {
  const response = await dataBase.post("/saveIngredients", {
    id,
    ingredientList,
  });
};

export const deleteIngredientList = (ingredientList, id) => async (
  dispatch
) => {
  const response = await dataBase.put("/deleteIngredients", {
    id,
    ingredientList,
  });
  console.log(id);
  dispatch({ type: "DELETE_INGREDIENTS", payload: response.data });
};

export const inicialIngredientList = (ingrList) => (dispatch) => {
  dispatch({ type: "INITIAL_INGREDIENTS", payload: ingrList });
};

export const createProfile = (userInfo) => async (dispatch) => {
  const response = await dataBase.post("", userInfo);
  console.log(response.data);
  dispatch({ type: "CREATE_PROFILE", payload: response.data });
};

export const deleteProfile = (userId) => async (dispatch) => {
  const response = await dataBase.delete("", { data: { userId } });
  dispatch({ type: "DELETE_PROFILE", payload: response.data });
};

export const fetchUser = (email, password) => async (dispatch) => {
  console.log("INSIDE");
  const test = { email: email, password: password };
  const response = await dataBase.post("/login", test);
  console.log(response.data, "action");
  dispatch({ type: "USER_LOGIN", payload: response.data });
};

export const logOut = () => (dispatch) => {
  dispatch({ type: "LOG_OUT", payload: {} });
};
// export const fetchUser = (userName) => async (dispatch) => {
//   // console.log("in");
//   const response = await dataBase.get("", { data: userName });
//   // console.log(response.data, "action");
//   dispatch({ type: "FETCH_USER", payload: response.data });
// };
