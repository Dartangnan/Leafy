import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "./SingleRecipe.css";
import xNav from "../images/x-nav-black.svg";

const SingleRecipe = (props) => {
  console.log(props);
  const recipe = props.location.state;

  const ingredientList = recipe.extendedIngredients.map((item) => {
    return (
      <li>
        <i class="fas fa-sort-up bullet"></i>
        {`${Math.round(item.measures.metric.amount, -1)}
        ${item.measures.metric.unitShort}`}
        &nbsp;-&nbsp;
        {`${item.name[0].toUpperCase().concat(item.name.slice(1))}`}
      </li>
    );
  });

  const instructions = recipe.analyzedInstructions[0].steps.map(
    (instruction) => {
      return (
        <li className="instruction">
          {" "}
          <i class="fas fa-leaf"></i>
          {instruction.step}
        </li>
      );
    }
  );

  return ReactDOM.createPortal(
    <div
      key={recipe.id + Math.trunc(Math.random() * 100)}
      className="recipe-bg"
    >
      <div className="single-recipe-container">
        <div className="exit-wrap">
          <Link className="exit-btn" to={props.location.prevPage}>
            <img alt="x-img" src={xNav} />
          </Link>
        </div>
        <h2>{recipe.title}</h2>
        <div className="image-info">
          <img className="recipe-image" alt="" src={recipe.image} />
          <div className="recipe-info">
            <div className="info-item">
              <i className="fas fa-clock"></i>
              {recipe.readyInMinutes} minutes
            </div>
            <div className="info-item">
              <i className="fas fa-users"></i>
              {recipe.servings} people
            </div>
            <div className="info-item">
              <i className="fas fa-seedling"></i>
              {recipe.diets.join(", ")}
            </div>
            <div className="info-item">
              <i className="fas fa-star"></i>
              {`${recipe.spoonacularScore}/100`}
            </div>
          </div>
        </div>
        <div className="ingredient-list">
          <h3>Ingredient List:</h3>
          <ul>{ingredientList}</ul>
        </div>
        <div className="instructions">
          <h3>instructions:</h3>
          <ul>{instructions}</ul>
        </div>
      </div>
    </div>,
    document.querySelector("#single-recipe")
  );
};

export default SingleRecipe;
