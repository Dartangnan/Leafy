import React from "react";
import { connect } from "react-redux";
import "./IngredientList.css";
import closeBtn from "../images/delete-item.png";

const IngredientList = (props) => {
  const grocList = {};
  const menu = props.currentMenu;
  if (!menu) return <div>Loading</div>;
  Object.keys(menu).map((day) => {
    Object.keys(menu[day]).forEach((itemId) => {
      menu[day][itemId].extendedIngredients.forEach((ingredient) => {
        if (Object.keys(grocList).includes(ingredient.id)) {
          if (
            grocList[ingredient.id].units === ingredient.measures.us.unitShort
          ) {
            grocList[ingredient.id].amount += ingredient.measures.us.amount;
            return;
          }
        }
        grocList[ingredient.id] = {
          name: ingredient.name,
          amount: ingredient.measures.us.amount,
          units: ingredient.measures.us.unitShort,
        };
      });
    });
  });

  const handleClick = (e) => {
    console.log(e.target.name);
    let tst = delete grocList[e.target.name];
    console.log(tst, grocList);
  };

  const list = Object.keys(grocList).map((itemId) => {
    return (
      <div className="groc-item">
        <div className="item-title" key={itemId}>
          {`${grocList[itemId].name[0].toUpperCase()}${grocList[
            itemId
          ].name.slice(1)}`}
          <span className="item-desc">{` [${grocList[itemId].amount} ${grocList[itemId].units}]`}</span>
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
  console.log(grocList);
  return (
    <div className="grocery-container">
      <h1>Ingredient List</h1>
      <hr />
      <div className="groc-list">{list}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return { currentMenu: state.menuReducer };
};

export default connect(mapStateToProps, {})(IngredientList);
