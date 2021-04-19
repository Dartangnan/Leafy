import React from "react";
import "./Menu.css";
import MenuItem from "./MenuItem";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { saveMenuToDB, fetchUser } from "../actions";

const Menu = (props) => {
  console.log(props.currentMenu);
  const updateMenu = () => {
    props
      .saveMenuToDB(props.currentMenu, props.currentUser._id)
      .then((ans) => props.fetchUser(""));
  };

  //
  const daysWithItems = Object.keys(props.currentMenu).sort((a, b) => {
    return a - b;
  });
  const menuItems = daysWithItems.map((day) => {
    return (
      <div>
        <MenuItem
          key={day}
          className="menu-item"
          itemOfMenu={props.currentMenu[day]}
          dayOfWeek={day}
        />
      </div>
    );
  });

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>Menu</h1>
        <hr />
      </div>
      <div className="menu-items">{menuItems}</div>
      <div className="menu-bottom-btns">
        <Link to={"/Recipes"} className="back-btn">
          Back
        </Link>
        <button onClick={updateMenu} className="save-btn">
          Save
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { currentMenu: state.menuReducer, currentUser: state.userReducer };
};

export default connect(mapStateToProps, { saveMenuToDB, fetchUser })(Menu);
