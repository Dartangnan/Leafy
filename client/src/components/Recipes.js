import React, { useEffect } from "react";
import "./Recipes.css";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import searchIcon from "../images/search-icon.svg";
import { Link } from "react-router-dom";
import { fetchRecipes } from "../actions";
import DaysOfWeekSelector from "./DaysOfWeekSelector";
// -=-=-=-=-= Helper Functions =-=-=-=-=-=-
const renderInputBar = (formProps) => {
  return (
    <input
      {...formProps.input}
      placeholder="Search the recipe..."
      className="search-input"
      type="text"
    />
  );
};

const renderComponents = (recipeList) => {
  return recipeList.map((recipe) => {
    return (
      <div className="recipe">
        <div className="recipe-img">
          <img alt="recipe" src={recipe.image} />
        </div>
        <div className="recipe-info">
          <h2 className="recipe-title">{recipe.title}</h2>
          <span
            dangerouslySetInnerHTML={{
              __html: recipe.summary.slice(
                0,
                recipe.summary.indexOf("All things considered")
              ),
            }}
            className="recipe-description"
          ></span>
        </div>
        <DaysOfWeekSelector />
      </div>
    );
  });
};

const renderInputBtn = (formProps) => {
  return <input alt="" className="search-btn" type="image" src={searchIcon} />;
};
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// -=-=-=-=-= Component =-=-=-=-=-=-

const Recipes = (props) => {
  //
  // -=-=-=-=-= useEffect Hook =-=-=-=-=-=-
  useEffect(() => {
    console.log(!props.recipeList[0]);
  }, []);
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  const onSubmit = (formValues) => {
    props.fetchRecipes(formValues.searchRecipeQuery);
  };

  return (
    <div className="recipes-container">
      <h1>Recipes</h1>
      <hr />
      <form onSubmit={props.handleSubmit(onSubmit)} className="search-bar">
        <Link to="/Recipes/Menu" className="menu-btn">
          Menu
        </Link>
        <Field name="searchRecipeQuery" component={renderInputBar} />
        <Field component={renderInputBtn} name="submitSearch" />
      </form>
      <div className="all-recipes">
        {props.recipeList[0] ? renderComponents(props.recipeList[0][1]) : ""}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const listOfRecipes = Object.keys(state.recipeReducer).map((key) => [
    key,
    state.recipeReducer[key],
  ]);
  return { recipeList: listOfRecipes };
};
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

export default connect(mapStateToProps, { fetchRecipes })(
  reduxForm({ form: "fetchListRecipes" })(Recipes)
);
