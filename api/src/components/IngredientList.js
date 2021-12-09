import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./IngredientList.css";
import closeBtn from "../images/delete-item.png";
import addBtn from "../images/add-item.png";
import {
  addIngredient,
  removeIngredient,
  deleteIngredientList,
  saveIngredientList,
  inicialIngredientList,
  addToIgredientList,
} from "../actions";

// -=-=-=-=-=-=-= Component =-=-=-=-=-=-=-=-

const IngredientList = (props) => {
  //
  // -=-= In case the user is not logged in should be directed to the login page =-=-

  if (!props.userReducer || Object.keys(props.userReducer).length === 0) {
    props.history.push("/login");
  }

  // -=-=-=-=-=-=-= Initial Variables =-=-=-=-=-=-=-=-

  let list;
  let grocList = {
    ...props.ingredients,
  };

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-=-=-= useRef and useEffect =-=-=-=-=-=-=-=-

  const [itemContent, setItemContent] = useState("");

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-=-=-= Helper Functions =-=-=-=-=-=-=-=-

  // Remove ingredient from list state in the store
  const handleClick = (e) => {
    props.removeIngredient(e.target.name);
  };

  // Add ingredient to the list state in the store
  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemContent === "") return;
    props.addIngredient(itemContent);
    setItemContent("");
  };

  // Handles typing change in order to make the variable controlled
  const handleChange = (e) => {
    setItemContent(e.target.value);
  };

  // Delete the whole list from the Database
  const clearList = () => {
    props.deleteIngredientList(JSON.stringify(grocList), props.userReducer._id);
  };

  // Saves the list in the Database
  const saveList = () => {
    props.saveIngredientList(JSON.stringify(grocList), props.userReducer._id);
  };

  // Writes in the list all the ingredients of the upcomming recipes saved in the menu state of the redux store:
  const updateList = () => {
    Object.keys(props.currentMenu).forEach((key) => {
      if (key < props.todayMilliSec) return;
      Object.keys(props.currentMenu[key]).forEach((recipeID) => {
        props.addToIgredientList(
          props.currentMenu[key][recipeID],
          key,
          props.todayMilliSec
        );
      });
    });
  };

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-=-=-= Create components =-=-=-=-=-=-=-=-

  if (!grocList) {
    list = <div></div>;
  } else {
    list = Object.keys(grocList).map((itemId) => {
      return (
        <div key={itemId} className="groc-item">
          <div className="item-title">
            {`${grocList[itemId].name[0].toUpperCase()}${grocList[
              itemId
            ].name.slice(1)}`}
            {grocList[itemId].amount != "" ? (
              <span className="item-desc">{` [${grocList[itemId].amount} ${grocList[itemId].units}]`}</span>
            ) : (
              ""
            )}
          </div>
          <img
            name={itemId}
            onClick={handleClick}
            className="delete-btn"
            alt=""
            src={closeBtn}
          />
        </div>
      );
    });
  }

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-=-=-= Render components =-=-=-=-=-=-=-=-

  return (
    <div className="grocery-container">
      <h1>Ingredient List</h1>
      <hr />
      <div className="groc-list">
        {list}
        <div className="groc-item">
          <form onSubmit={handleSubmit} className="groc-item">
            <input
              value={itemContent}
              onChange={handleChange}
              name="new-item"
              className="item-title"
            />
          </form>

          <img
            onClick={handleSubmit}
            className="delete-btn"
            alt=""
            src={addBtn}
          />
        </div>
      </div>
      <div className="menu-bottom-btns-ingr">
        <button onClick={clearList} className="back-btn">
          Clear List
        </button>
        <button onClick={saveList} className="save-btn">
          Save List
        </button>
      </div>
      <div className=" btn-lrg-container">
        <button onClick={updateList} className=" btn-lrg">
          Add Items from Upcoming Recipes
        </button>
      </div>
    </div>
  );
};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer,
    currentMenu: state.menuReducer,
    ingredients: state.ingredientList,
    todayMilliSec: state.todayMilliSec,
  };
};

export default connect(mapStateToProps, {
  addIngredient,
  removeIngredient,
  deleteIngredientList,
  saveIngredientList,
  inicialIngredientList,
  addToIgredientList,
})(IngredientList);
