import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link, useLocation } from "react-router-dom";
import "./Recipes.css";
import searchIcon from "../images/search-icon.svg";
import { fetchRecipes } from "../actions";
import DaysOfWeekSelector from "./DaysOfWeekSelector";

// -=-=-=-=-= Helper Function - Generate search bar =-=-=-=-=-=-

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

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// -=-=-=-=-= Helper Function - Generate search button =-=-=-=-=-=-

const renderInputBtn = () => {
  return <input alt="" className="search-btn" type="image" src={searchIcon} />;
};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// -=-=-=-=-= Component =-=-=-=-=-=-

const Recipes = (props) => {
  //
  // -=-= In case the user is not logged in should be directed to the login page =-=-
  if (!props.userReducer || Object.keys(props.userReducer).length === 0) {
    props.history.push("/login");
  }

  // In order to comeback to this route once a single recipe is opened:
  const location = useLocation();

  // -=-=-=-=-= Helper Function - Handle submit =-=-=-=-=-=-

  const onSubmit = (formValues) => {
    props.fetchRecipes(formValues.searchRecipeQuery);
  };

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-= Helper Function - Generate recipes =-=-=-=-=-=-

  const renderComponents = (recipeList) => {
    return recipeList.map((recipe) => {
      return (
        <div id={recipe.id} key={recipe.id} className="recipe">
          <div className="recipe-img">
            <Link
              to={{
                pathname: `/SingleRecipe/${recipe.id}`,
                state: recipe,
                prevPage: location.pathname,
              }}
            >
              <img alt="recipe" src={recipe.image} />
            </Link>
          </div>
          <div className="recipe-info">
            <div className="recipe-title">
              <Link
                className="recipe-title"
                to={{
                  pathname: `/SingleRecipe/${recipe.id}`,
                  state: recipe,
                  prevPage: location.pathname,
                }}
              >
                <h2>{recipe.title}</h2>
              </Link>
            </div>
            <span
              dangerouslySetInnerHTML={{
                __html: recipe.summary.slice(
                  0,
                  recipe.summary.indexOf("All things considered")
                ),
              }}
              className="recipe-description"
            ></span>
            {/* The text is sliced in order to give more white space. */}
          </div>
          <DaysOfWeekSelector currentRecipe={recipe} />
        </div>
      );
    });
  };

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-= Render Components =-=-=-=-=-=-
  return (
    <>
      <div className="recipes-container">
        <h1>Recipes</h1>
        <hr />
        <form onSubmit={props.handleSubmit(onSubmit)} className="search-bar">
          <Link to="/Recipes/Menu" className="menu-btn">
            Menu
          </Link>
          <div className="search-div">
            <Field name="searchRecipeQuery" component={renderInputBar} />
            <Field component={renderInputBtn} name="submitSearch" />
          </div>
        </form>
        <div className="all-recipes">
          {props.recipeList[0] ? renderComponents(props.recipeList[0][1]) : ""}
        </div>
      </div>
    </>
  );
};
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
const mapStateToProps = (state) => {
  const listOfRecipes = Object.keys(state.recipeReducer).map((key) => [
    key,
    state.recipeReducer[key],
  ]);

  return { recipeList: listOfRecipes, userReducer: state.userReducer };
};

export default connect(mapStateToProps, { fetchRecipes })(
  reduxForm({ form: "fetchListRecipes" })(Recipes)
);
