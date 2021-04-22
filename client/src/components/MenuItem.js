import React from "react";
// import "./Menu.css";

const MenuItem = (props) => {
  const objKeys = Object.keys(props.itemOfMenu);
  if (objKeys.length === 0) return "";

  const currentDate = new Date(+props.dayOfWeek);
  const currentDateFormat = currentDate.toLocaleString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const currentDayWeek = currentDate.toLocaleString("default", {
    weekday: "long",
  });

  //   console.log(currentDate);
  console.log(objKeys);
  const itemsOfDay = objKeys.map((item) => {
    return (
      <>
        <div key={props.itemOfMenu[item].id} className="item-content">
          <img alt="" src={props.itemOfMenu[item].image} />
          <h4>{props.itemOfMenu[item].title}</h4>
        </div>
      </>
    );
  });
  return (
    <div className="daily-menu">
      <div className="item-header">
        <span className="item-day-week">{currentDayWeek} </span>
        {`  - ${currentDateFormat}`}
      </div>
      <div className="items-of-day">{itemsOfDay}</div>
    </div>
  );
};

export default MenuItem;
