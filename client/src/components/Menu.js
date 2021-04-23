import React from "react";
import MenuItem from "./MenuItem";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { saveMenuToDB, fetchUser } from "../actions";
import "./Menu.css";

// -=-=-=-=-=-=-= Component =-=-=-=-=-=-=-=-

const Menu = (props) => {
  //
  // -=-=-=-=-= Helper function - Updates menu in DB =-=-=-=-=-

  const updateMenu = () => {
    props.saveMenuToDB(props.currentMenu, props.userReducer._id);
  };

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-=-=-=  Create components =-=-=-=-=-=-=-=-

  const daysWithItems = Object.keys(props.currentMenu).sort((a, b) => {
    return a - b;
  }); // sort items per day of the week to make sure they are displayed properly

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

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-=-=-= Render Components =-=-=-=-=-=-=-=-

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

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const mapStateToProps = (state) => {
  return { currentMenu: state.menuReducer, userReducer: state.userReducer };
};

export default connect(mapStateToProps, { saveMenuToDB, fetchUser })(Menu);
