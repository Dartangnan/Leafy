import React, { useRef } from "react";
import MainAnimation from "./MainAnimation";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GroceryList from "./GroceryList";
import Login from "./Login";
import Home from "./Home";
import Profile from "./Profile";
import Overall from "./Overall";
import Menu from "./Menu";
import Recipes from "./Recipes";
import NavBar from "./NavBar";

// const isLoggedIn = true;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Profile" component={Profile} />
          <Route path="/Recipes" exact component={Recipes} />
          <Route path="/Overall" component={Overall} />
          <Route path="/GroceryList" component={GroceryList} />
          <Route path="/Recipes/Menu" component={Menu} />
          <Route path="/Login" component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
