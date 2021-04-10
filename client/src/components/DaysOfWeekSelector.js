import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { addRecipeToMenu, deleteRecipeToMenu } from "../actions";

// -=-=-=-=-= COMPONENT =-=-=-=-=-
const DaysOfWeekSelector = (props) => {
  //
  // Building the current day in a way to omit the time (HH-MM-SS):
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  // console.log(props.menuCurrent);
  const today = new Date();
  const date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  // Retrieve the current date in milliseconds:
  const dateTest = new Date(date);
  const todayMS = dateTest.valueOf();

  // -=-=-=-=-= HELPER FUNCTIONS =-=-=-=-=-
  const findActive = (domElements, todayMS, today) => {
    //

    const currentDay = today.getDay() - 1 === -1 ? 6 : today.getDay() - 1;
    console.log("in2");

    const idArray = daysOfWeek.map((day, index) => {
      return todayMS + (index - currentDay) * 86400000;
    });

    domElements.querySelectorAll(".day-add-btn").forEach((el, i) => {
      console.log(props.menuCurrent, idArray[i]);
      if (!props.menuCurrent[idArray[i]]) return;
      if (!props.menuCurrent[idArray[i]][props.currentRecipe.id]) return;
      console.log("in3");
      el.classList.add("day-added");
    });
  };

  // -=-=-=-=-= HANDLE CLICK =-=-=-=-=-

  const handleClick = (e) => {
    // Everytime that one of the divs is clicked the recepie should be added to an provisional menu. That will be posted once the user hits save:
    //
    // Cheack if the target was one of the buttons which have only 3 characters:
    if (e.target.innerText.length !== 3) return;

    // Change the style of the button clicked
    e.target.classList.toggle("day-added");

    // Define which day was clicked so the meal can be selected and assigned properly:
    const currentDay = today.getDay() - 1 === -1 ? 6 : today.getDay() - 1;
    const daySelected = daysOfWeek.findIndex((el) => el === e.target.innerText);
    let diff = daySelected - currentDay;
    // Finding the day selected in milliseconds so can be used as a key in the future
    const daySelectedID = todayMS + diff * 86400000;
    props.addRecipeToMenu(props.currentRecipe, daySelectedID);
    // console.log(props.currentRecipe.id);
  };
  //
  // -=-=-=-=-= USE EFFECT AND USE REF=-=-=-=-=-
  const weekDaysDivs = useRef(null);
  // Make sure that the boxes are selected/ticked when user navigates in the app but comes back to the Recipes page
  useEffect((currentDay) => {
    // console.log("rerender");
    findActive(weekDaysDivs.current, todayMS, today);
    // console.log(weekDaysDivs.current);
  });
  return (
    <div ref={weekDaysDivs} onClick={handleClick} className="days-of-week">
      <div className="day-add-btn">Mon</div>
      <div className="day-add-btn">Tue</div>
      <div className="day-add-btn">Wed</div>
      <div className="day-add-btn">Thu</div>
      <div className="day-add-btn">Fri</div>
      <div className="day-add-btn">Sat</div>
      <div className="day-add-btn">Sun</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { menuCurrent: state.menuReducer };
};

export default connect(mapStateToProps, {
  addRecipeToMenu,
  deleteRecipeToMenu,
})(DaysOfWeekSelector);
