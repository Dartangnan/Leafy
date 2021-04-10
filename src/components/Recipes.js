import React, { useEffect } from "react";
import "./Recipes.css";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import searchIcon from "../images/search-icon.svg";
import { Link } from "react-router-dom";
import { fetchRecipes } from "../actions";

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

const renderInputBtn = (formProps) => {
  return <input alt="" className="search-btn" type="image" src={searchIcon} />;
};

const Recipes = (props) => {
  // -=-=-=-=-= useEffect Hook =-=-=-=-=-=-
  useEffect(() => {
    console.log(props.recipeList);
  });

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  const onSubmit = (formValues) => {
    // console.log(formValues);
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
    </div>
  );
};

const mapStateToProps = (state) => {
  const listOfRecipes = Object.keys(state.recipeReducer).map((key) => [
    key,
    state.recipeReducer[key],
  ]);
  return { recipeList: listOfRecipes[0][1] };
};

export default connect(mapStateToProps, { fetchRecipes })(
  reduxForm({ form: "fetchListRecipes" })(Recipes)
);
