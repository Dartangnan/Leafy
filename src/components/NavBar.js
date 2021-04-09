//  -=-=-=-=-=-=-=-= Imports =-=-=-=-=-=-=-=-
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import imgLower from "../images/bottom-nav-bar-logo.png";
import leavesAvatar from "../images/leaves-avatar.svg";
import avatarPicture from "../images/profile_picture.png";
import xNav from "../images/x-nav.svg";

//  -=-=-=-=-=-=-=-= NavBar Component =-=-=-=-=-=-=-=-
const NavBar = () => {
  //
  const navBarDOM = useRef(null);

  const hideBar = () => {
    navBarDOM.current.classList.add("hidden-bar");
    navBarDOM.current
      .querySelector(".arrow-nav-bar")
      .classList.add("show-arrow");
  };

  const showBar = () => {
    console.log(navBarDOM.current);
    navBarDOM.current.classList.remove("hidden-bar");
    navBarDOM.current
      .querySelector(".arrow-nav-bar")
      .classList.remove("show-arrow");
  };
  //
  //  -=-=-=-=-=-=-=-= JSX =-=-=-=-=-=-=-=-
  return (
    <div ref={navBarDOM} className="nav-bar">
      {/*------------ UPPER PART OF THE NAVBAR ------------ */}
      <div className="upper-nav">
        <div className="avatar">
          <div className="avatar-picture">
            <img src={avatarPicture} />
          </div>
          <img className="avatar-leaves" src={leavesAvatar} />
          <h4 className="user-name">Dart</h4>
        </div>
        <h3 className="initial-message">Hello, how are you doing today?</h3>
        <div className="bar-toggle">
          <img onClick={hideBar} alt="x-image" src={xNav} />
        </div>
      </div>
      {/*---------------------------------------------------  */}

      {/*------------------- ARROW NAV BAR ------------------- */}
      <div onClick={showBar} className="arrow-nav-bar">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 9" id="vector">
          <path
            id="path"
            d="M 4.5 0 C 3.307 0 2.162 0.474 1.318 1.318 C 0.474 2.162 0 3.307 0 4.5 C 0 5.693 0.474 6.838 1.318 7.682 C 2.162 8.526 3.307 9 4.5 9 C 5.693 9 6.838 8.526 7.682 7.682 C 8.526 6.838 9 5.693 9 4.5 C 9 3.307 8.526 2.162 7.682 1.318 C 6.838 0.474 5.693 0 4.5 0 Z"
            fill="#9ace7c"
            stroke-width="1"
          />
          <path
            id="path_1"
            d="M 6.8 4.5 L 4.9 2.6 C 4.8 2.5 4.6 2.5 4.5 2.6 L 4.2 2.9 C 4.1 3 4.1 3.1 4.2 3.2 L 5.2 4.1 L 1.9 4.1 C 1.6 4.1 1.4 4.2 1.4 4.5 L 1.4 5 C 1.4 5.2 1.8 5.2 1.9 5.2 L 5.2 5.2 L 4.2 6.2 C 4.1 6.3 4.1 6.5 4.2 6.6 L 4.4 6.8 C 4.6 7 4.7 7 4.9 6.9 L 6.8 5 C 6.9 4.9 6.9 4.9 6.9 4.8 C 6.9 4.7 6.8 4.6 6.8 4.5 Z"
            fill="#ffffff"
            stroke-width="1"
          />
        </svg>
      </div>
      {/*--------------------------------------------------- */}

      {/*------------------- MID NAV BAR ------------------- */}
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
      {/*--------------------------------------------------- */}

      {/*----------------- LOWER NAV BAR ----------------- */}
      <div className="lower-nav">
        <img alt="bottom-logo" src={imgLower} />
      </div>
      {/*--------------------------------------------------- */}
    </div>
  );
};

export default NavBar;
