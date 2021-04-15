import React from "react";
import "./Menu.css";
import MenuItem from "./MenuItem";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { saveMenuToDB } from "../actions";
import axios from "axios";

const Menu = (props) => {
  const testeFunction = async () => {
    let formData = new FormData();
    formData.append("firstName", "Dartangnan");
    console.log(props.currentMenu);
    const menu = props.currentMenu;
    console.log(menu);
    const response = await axios.post("http://localhost:3001/", menu);
    // await fetch("http://localhost:3001/", { method: "POST", body: "hello" });

    console.log("in");
    // console.log(response);
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
        <button onClick={testeFunction} className="save-btn">
          Save
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { currentMenu: state.menuReducer };
};

export default connect(mapStateToProps, { saveMenuToDB })(Menu);
