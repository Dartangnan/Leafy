import React from "react";

// -=-=-=-=-=-=-= Component =-=-=-=-=-=-=-=-
//
const MenuItem = (props) => {
  //
  // In case there are no items in the menu

  const objKeys = Object.keys(props.itemOfMenu);
  if (objKeys.length === 0) return "";

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // Converting the day passed by parent component to a nice format so can be displayed

  const currentDate = new Date(+props.dayOfWeek);

  const currentDateFormat = currentDate.toLocaleString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const currentDayWeek = currentDate.toLocaleString("default", {
    weekday: "long",
  });

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-=-=-= Generate components =-=-=-=-=-=-=-=-

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

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-=-=-= Render components =-=-=-=-=-=-=-=-

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
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

export default MenuItem;
