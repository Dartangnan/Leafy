import axios from "axios";
export default axios.create({
  baseURL: "https://api.spoonacular.com/recipes/complexSearch",
  params: {
    apiKey: "eb6161f8952649ec9ca9efb49c3ff871",
    addRecipeInformation: true,
    instructionsRequired: true,
    fillIngredients: true,
  },
});
