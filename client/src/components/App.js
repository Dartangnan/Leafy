import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
// -=-=-=-=-=-=-=-=-= Components =-=-=-=-=-=-=-=-=-=-
import GroceryList from "./GroceryList";
import Login from "./Login";
import Home from "./Home";
import Profile from "./Profile";
import Overall from "./Overall";
import Menu from "./Menu";
import Recipes from "./Recipes";
import NavBar from "./NavBar";
import SingleRecipe from "./SingleRecipe";
// import MainAnimation from "./MainAnimation";
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <Switch>
          <Fragment>
            <div className="app-body">
              <Route path="/" exact component={Home} />
              <Route path="/Profile" component={Profile} />
              <Route path="/Recipes" exact component={Recipes} />
              <Route path="/Overall" component={Overall} />
              <Route path="/GroceryList" component={GroceryList} />
              <Route path="/Recipes/Menu" component={Menu} />
              <Route path="/Login" component={Login} />
              <Route path="/SingleRecipe/:id" component={SingleRecipe} />
            </div>
          </Fragment>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
