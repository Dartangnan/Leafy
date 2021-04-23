import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  addRecipeToMenu,
  deleteRecipeToMenu,
  addToIgredientList,
  removeFromIgredientList,
} from "../actions";

// -=-=-=-=-=-=-= Component =-=-=-=-=-=-=-=-
const DaysOfWeekSelector = (props) => {
  //
  // -=-=-=-=-= Initial Variables =-=-=-=-=-=-

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const { todayMilliSec } = props;
  const today = new Date();

  //
  const currentDay = today.getDay() - 1 === -1 ? 6 : today.getDay() - 1; // Since the Date() API gives the day of the week between 0 and 6 I am jus converting it to 1 to 7.

  // Finding all de days of the current week in milliseconds since 1970/01/01 so it can be used as the ID for the object containing all the recipes selected for a certain day.
  const idArray = daysOfWeek.map((day, index) => {
    return todayMilliSec + (index - currentDay) * 86400000;
  });

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-= Helper Function - Find the recipes that selected =-=-=-=-=-=-

  // The function is used in order to keep the selected boxed dark in case the user visits other route and comes back to the recipes route.
  const findActive = (domElements, todayMilliSec, today, idArray) => {
    domElements.querySelectorAll(".day-add-btn").forEach((el, i) => {
      if (!props.menuCurrent[idArray[i]]) return;
      if (!props.menuCurrent[idArray[i]][props.currentRecipe.id]) return;
      el.classList.add("day-added");
    });
  };

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-= Helper Function - Handles click =-=-=-=-=-=-

  const handleClick = (e) => {
    // Everytime that one of the divs is clicked the recepie should be added to the menu at the redux store. Once the user clicks save in the Menu component, the menu stored at the redux store is uploaded to the library and the user state is updated.

    // Checks if the target was one of the buttons which have only 3 characters:
    if (e.target.innerText.length !== 3) return;

    // If the div was selected already, then, it should be deleted, from both the current menu and from the ingredient list.
    if (e.target.classList.contains("day-added")) {
      e.target.classList.remove("day-added");
      const dayID =
        idArray[daysOfWeek.findIndex((el) => el === `${e.target.innerText}`)];
      props.deleteRecipeToMenu(dayID, props.currentRecipe.id);
      props.removeFromIgredientList(props.currentRecipe);
      return;
    } else {
      //
      // If the recipe was not selected for a specific day, then it is added to the menu and its ingredients are added to the ingredient list:
      e.target.classList.add("day-added");

      // Define which day of the week in milliseconds since 1970/01/01 was clicked so the meal can be selected and assigned properly:
      const daySelectedPosition = daysOfWeek.findIndex(
        (el) => el === e.target.innerText
      ); // Using the position of the day in the days of the week array
      const diff = daySelectedPosition - currentDay;
      const daySelectedID = todayMilliSec + diff * 86400000;

      // Add recipe to the menu stored in the redux store and add ingredients of the recipe to the ingredients list
      props.addRecipeToMenu(props.currentRecipe, daySelectedID, null);
      props.addToIgredientList(
        props.currentRecipe,
        daySelectedID,
        todayMilliSec
      );
      return;
    }
  };
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-= useEffect and useRef =-=-=-=-=-

  const weekDaysDivs = useRef(null);

  useEffect((currentDay) => {
    // Make sure that the boxes are selected/ticked when user navigates through the app and comes back to the Recipes route
    findActive(weekDaysDivs.current, todayMilliSec, today, idArray);
  });

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-= Generate divs with weekdays =-=-=-=-=-
  const days = daysOfWeek.map((day) => {
    return <div className="day-add-btn">{day}</div>;
  });

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-= Render components =-=-=-=-=-=-

  return (
    <div ref={weekDaysDivs} onClick={handleClick} className="days-of-week">
      {days}
    </div>
  );
};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const mapStateToProps = (state) => {
  return { menuCurrent: state.menuReducer, todayMilliSec: state.todayMilliSec };
};

export default connect(mapStateToProps, {
  addRecipeToMenu,
  deleteRecipeToMenu,
  addToIgredientList,
  removeFromIgredientList,
})(DaysOfWeekSelector);
