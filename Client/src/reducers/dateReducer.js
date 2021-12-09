export default (state = null, action) => {
  switch (action.type) {
    case "RETRIEVE_DATE":
      const today = new Date();
      const date = `${today.getFullYear()}-${
        today.getMonth() + 1
      }-${today.getDate()}`;
      const dateStandard = new Date(date);
      const todayMiliSec = dateStandard.valueOf();
      return todayMiliSec;
    default:
      return state;
  }
};
