import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./Home.css";

// -=-=-=-=-=-=-=-= Component =-=-=-=-=-=-=-=-

const Home = (props) => {
  //
  // -=-= In case the user is not logged in should be directed to the login page =-=-
  if (!props.currentUser || Object.keys(props.currentUser).length === 0) {
    props.history.push("/login");
  }

  // In order to comeback to this route once a single recipe is opened:
  const location = useLocation();

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  const [currentDay, setCurrentDate] = useState(props.todayMilliSec);

  // -=-=-= Getting information to display the date of the day that contains the recipes showed: =-=-
  const currentDate = new Date(currentDay);
  const currentDayMonth = currentDate.toLocaleString("default", {
    day: "numeric",
    month: "short",
  });

  const currentYear = currentDate.toLocaleString("default", {
    year: "numeric",
  });

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-=-=-=-= Helper functions - change the day that is shown =-=-=-=-=-=-=-=-

  const goBackADay = () => {
    setCurrentDate(currentDay - 86400000);
  };

  const goForwardADay = () => {
    setCurrentDate(currentDay + 86400000);
  };

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // Initial Variable:
  let todayMenuDisplay;

  // -=-=-=-=-=-=-=-= Generate the cards where the recipes are shown =-=-=-=-=-=-=-=-
  if (props.currentUser.menuHistory) {
    const menu = JSON.parse(props.currentUser.menuHistory);
    if (!menu[`${currentDay}`]) {
      todayMenuDisplay = <div>No data available</div>;
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
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-=-=-=-= Render components =-=-=-=-=-=-=-=-
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
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
};
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const mapStateToProps = (state) => {
  return { currentUser: state.userReducer, todayMilliSec: state.todayMilliSec };
};

export default connect(mapStateToProps, {})(Home);
