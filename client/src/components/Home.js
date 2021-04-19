import React, { useState } from "react";
import "./Home.css";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

// ----- Get current date in milissenconds ----
const today = new Date();
const date = `${today.getFullYear()}-${
  today.getMonth() + 1
}-${today.getDate()}`;
const dateTest = new Date(date);
const todayMS = dateTest.valueOf();
// console.log("IN");
// ---------------------------------------------
const Home = (props) => {
  const location = useLocation();
  const [currentDay, setCurrentDate] = useState(todayMS);
  // console.log(currentDay);
  const currentDate = new Date(currentDay);
  const currentDayMonth = currentDate.toLocaleString("default", {
    day: "numeric",
    month: "short",
  });

  const currentYear = currentDate.toLocaleString("default", {
    year: "numeric",
  });

  const goBackADay = () => {
    setCurrentDate(currentDay - 86400000);
  };

  const goForwardADay = () => {
    setCurrentDate(currentDay + 86400000);
  };

  let todayMenuDisplay = <div>Hey</div>;

  if (props.currentUser.menuHistory) {
    const menu = JSON.parse(props.currentUser.menuHistory);
    if (!menu[`${currentDay}`]) {
      todayMenuDisplay = <div>Not available</div>;
    } else {
      let todayMenu = menu[`${currentDay}`];
      todayMenuDisplay = Object.keys(menu[`${currentDay}`]).map((item) => {
        // console.log(todayMenu[item]);
        return (
          <div className="recipe-card" key={todayMenu[item].id}>
            <div className="title-recipe">{todayMenu[item].title}</div>
            <div className="info-recipe">
              <img
                className="image-recipe"
                alt=""
                src={todayMenu[item].image}
              />
              <span
                dangerouslySetInnerHTML={{
                  __html: todayMenu[item].summary.slice(0, 450) + "...",
                }}
              ></span>
            </div>
            <Link
              className="home-link"
              to={{
                pathname: `/SingleRecipe/${todayMenu[item].id}`,
                state: todayMenu[item],
                prevPage: location.pathname,
              }}
            >
              <button className="save-btn">Full Recipe</button>
            </Link>
          </div>
        );
      });
    }
  }

  return (
    <div className="home-container">
      <h1>Home</h1>
      <hr />
      <div className="day-selector">
        <i onClick={goBackADay} className="left fas fa-sort-up "></i>
        <h2 className="day-selected">
          {currentDayMonth}
          <span>{`, ${currentYear}`}</span>
        </h2>
        <i onClick={goForwardADay} className=" right fas fa-sort-up "></i>
      </div>
      <div className="display-todays-recipe">{todayMenuDisplay}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { currentUser: state.userReducer };
};

export default connect(mapStateToProps, {})(Home);
