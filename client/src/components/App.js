import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { fetchUser, addRecipeToMenu } from "../actions";
import { connect } from "react-redux";
// -=-=-=-=-=-=-=-=-= Components =-=-=-=-=-=-=-=-=-=-
import IngredientList from "./IngredientList";
import Login from "./Login";
import Home from "./Home";
import Profile from "./Profile";
import Menu from "./Menu";
import Recipes from "./Recipes";
import NavBar from "./NavBar";
import SingleRecipe from "./SingleRecipe";
// import MainAnimation from "./MainAnimation";
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const App = (props) => {
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
              <Route path="/IngredientList" component={IngredientList} />
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

const mapStateToProps = (state) => {
  return { currentUser: state.userReducer };
};

export default connect(mapStateToProps, { fetchUser, addRecipeToMenu })(App);
