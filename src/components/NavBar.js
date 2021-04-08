import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/Profile">Profile</Link>
        <Link to="/Recipes">Recipes</Link>
        <Link to="/Overall">History</Link>
        <Link to="/GroceryList">Grocery List</Link>
        <Link to="/Login">Exit</Link>
      </ul>
    </div>
  );
};

export default NavBar;
