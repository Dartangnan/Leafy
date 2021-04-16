import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { addRecipeToMenu, deleteRecipeToMenu } from "../actions";

// -=-=-=-=-= COMPONENT =-=-=-=-=-
const DaysOfWeekSelector = (props) => {
  //
  // Building the current day in a way to omit the time (HH-MM-SS):
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Retrieve the current date in milliseconds:
  const today = new Date();
  const date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const dateTest = new Date(date);
  const todayMS = dateTest.valueOf();
  // ------------------------------------------
  const currentDay = today.getDay() - 1 === -1 ? 6 : today.getDay() - 1;
  const idArray = daysOfWeek.map((day, index) => {
    return todayMS + (index - currentDay) * 86400000;
  });
  // -=-=-=-=-= HELPER FUNCTIONS =-=-=-=-=-
  const findActive = (domElements, todayMS, today, idArray) => {
    //

    domElements.querySelectorAll(".day-add-btn").forEach((el, i) => {
      if (!props.menuCurrent[idArray[i]]) return;
      if (!props.menuCurrent[idArray[i]][props.currentRecipe.id]) return;
      el.classList.add("day-added");
    });
  };

  // -=-=-=-=-= HANDLE CLICK =-=-=-=-=-

  const handleClick = (e) => {
    // Everytime that one of the divs is clicked the recepie should be added to an provisional menu. That will be posted once the user hits save:
    //
    // Cheack if the target was one of the buttons which have only 3 characters:
    if (e.target.innerText.length !== 3) return;

    if (e.target.classList.contains("day-added")) {
      e.target.classList.remove("day-added");
      const dayID =
        idArray[daysOfWeek.findIndex((el) => el === `${e.target.innerText}`)];
      props.deleteRecipeToMenu(dayID, props.currentRecipe.id);

      // Change the style of the button clicked

      return;
    } else {
      // Change the style of the button clicked
      e.target.classList.add("day-added");
      // Define which day was clicked so the meal can be selected and assigned properly:
      const currentDay = today.getDay() - 1 === -1 ? 6 : today.getDay() - 1;
      const daySelected = daysOfWeek.findIndex(
        (el) => el === e.target.innerText
      );
      let diff = daySelected - currentDay;
      // Finding the day selected in milliseconds so can be used as a key in the future
      const daySelectedID = todayMS + diff * 86400000;
      props.addRecipeToMenu(props.currentRecipe, daySelectedID);

      return;
    }
  };
  //
  // -=-=-=-=-= USE EFFECT AND USE REF=-=-=-=-=-
  const weekDaysDivs = useRef(null);
  // Make sure that the boxes are selected/ticked when user navigates in the app but comes back to the Recipes page
  useEffect((currentDay) => {
    findActive(weekDaysDivs.current, todayMS, today, idArray);
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
  // console.log(state);
  return { menuCurrent: state.menuReducer };
};

export default connect(mapStateToProps, {
  addRecipeToMenu,
  deleteRecipeToMenu,
})(DaysOfWeekSelector);
