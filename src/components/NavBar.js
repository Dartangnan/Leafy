import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import imgLower from "../images/bottom-nav-bar-logo.png";
const NavBar = () => {
  return (
    <div className="nav-bar">
      <div className="upper-nav">Upper Nav</div>
      <ul className="nav-links">
        <Link className="nav-link first-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/Profile">
          Profile
        </Link>
        <Link className="nav-link" to="/Recipes">
          Recipes
        </Link>
        <Link className="nav-link" to="/Overall">
          History
        </Link>
        <Link className="nav-link" to="/GroceryList">
          Grocery List
        </Link>
        <Link className="nav-link last-link" to="/Login">
          Exit
        </Link>
      </ul>
      <div className="lower-nav">
        <img alt="bottom-logo" src={imgLower} />
      </div>
    </div>
  );
};

export default NavBar;
