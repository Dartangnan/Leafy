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

const today = new Date();
const date = `${today.getFullYear()}-${
  today.getMonth() + 1
}-${today.getDate()}`;
const dateTest = new Date(date);
const todayMS = dateTest.valueOf();

const IngredientList = (props) => {
  console.log(props.ingredients);
  if (!props.user || Object.keys(props.user).length === 0) {
    props.history.push("/login");
  }
  let list;
  const [itemContent, setItemContent] = useState("");

  useEffect(() => {
    if (
      !props.user.ingredientsList ||
      Object.keys(props.user.ingredientsList).length === 0
    ) {
      grocList = {};
      return;
    }
    props.inicialIngredientList(JSON.parse(props.user.ingredientsList));
    grocList = {
      ...(props.user.ingredientsList
        ? JSON.parse(props.user.ingredientsList)
        : {}),
      ...props.ingredients,
    };
  }, [props.user.ingredientsList]);
  let grocList = {
    // ...(props.user.ingredientsList
    //   ? JSON.parse(props.user.ingredientsList)
    //   : {}),
    ...props.ingredients,
  };
  const menu = props.currentMenu;
  if (!menu) return <div>Loading</div>;
  const handleClick = (e) => {
    props.removeIngredient(e.target.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemContent === "") return;
    props.addIngredient(itemContent);
    setItemContent("");
  };

  const handleChange = (e) => {
    setItemContent(e.target.value);
  };

  const clearList = () => {
    props.deleteIngredientList(JSON.stringify(grocList), props.user._id);
  };

  const saveList = () => {
    props.saveIngredientList(JSON.stringify(grocList), props.user._id);
  };

  const updateList = () => {
    Object.keys(props.currentMenu).forEach((key) => {
      if (key < todayMS) return;
      Object.keys(props.currentMenu[key]).forEach((recipeID) => {
        props.addToIgredientList(
          props.currentMenu[key][recipeID],
          key,
          todayMS
        );
      });
    });
  };

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
      <div className="menu-bottom-btns">
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

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.userReducer,
    currentMenu: state.menuReducer,
    ingredients: state.ingredientList,
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
