import React from "react";
import { connect } from "react-redux";

const DaysOfWeekSelector = () => {
  //
  const handleClick = (e) => {
    console.log(e.target.innerText);
    // this.classList.add("day-added");
    if (e.target.innerText.length !== 3) return;
    e.target.classList.toggle("day-added");
  };

  return (
    <div onClick={handleClick} className="days-of-week">
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

export default DaysOfWeekSelector;
